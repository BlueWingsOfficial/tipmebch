const {
  formatBchWithUsd,
  parseBchOrUsdAmount,
  withdraw,
  bchToUsd,
  getBalanceForUser,
} = require('../apis');
const { BalanceWouldBecomeNegativeError } = require('../errors');

module.exports = async ({
  message,
  reply,
  params,
  tipping,
  isPm,
  userId,
  fetchRpc,
  lockBitcoind,
  redisClient,
  ctx,
}) => {
  if (!isPm) {
    await reply('Ese comando solo funciona en un mensaje privado para mí.');
    return;
  }

  if (params.length !== 2) {
    await reply(`El comando que has usado no es correcto. / retirar <billetera> <cantidad de BCH>`);
    return;
  }

  const [address, amountRaw] = params;

  const isWithdrawAll = amountRaw.toLowerCase() === 'all';

  const theirAmount = isWithdrawAll
    ? await getBalanceForUser(userId, { minConf: 1, fetchRpc })
    : await parseBchOrUsdAmount(amountRaw);

  if (!theirAmount) {
    await reply(
      `El comando que has usado no es correcto. Dime la cantidad de BCH de la siguiente manera. / retirar <billetera> <0.0001>`
    );
    return;
  }

  let actualAmount;

  try {
    const result = await withdraw(userId, address, theirAmount, {
      fetchRpc,
      lockBitcoind,
    });

    const { txid } = result;

    actualAmount = result.amount;

    const amountText = await formatBchWithUsd(actualAmount);
    const url = `https://explorer.bitcoin.com/bch/tx/${txid}`;

    await reply(`Usted retira ${amountText}: ${url}`);
  } catch (e) {
    if (e instanceof BalanceWouldBecomeNegativeError) {
      await ctx.maybeReplyFromStickerSet('insufficient-balance');
      await ctx.reply(`Su saldo es insuficiente...`);
      return;
    } else {
      throw e;
    }
  }

  const usdAmount = await bchToUsd(actualAmount);

  await Promise.all([
    redisClient.incrbyfloatAsync('stats.withdrawn.bch', actualAmount),
    redisClient.incrbyfloatAsync('stats.withdrawn.usd', usdAmount),
    redisClient.incrAsync('stats.withdrawn.count'),
  ]);
};
