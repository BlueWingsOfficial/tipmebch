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
    await reply('Este comando sólo funciona si me lo envías por mensaje privado.');
    return;
  }

  if (params.length !== 2) {
    await reply(`El comando que has usado no es correcto. Prueba con /retirar <cartera> <cantidad de BCH>`);
    return;
  }

  const [address, amountRaw] = params;

  const isWithdrawAll = amountRaw.toLowerCase() === 'all';

  const theirAmount = isWithdrawAll
    ? await getBalanceForUser(userId, { minConf: 1, fetchRpc })
    : await parseBchOrUsdAmount(amountRaw);

  if (!theirAmount) {
    await reply(
      `El comando que has usado no es correcto. Dime la cantidad de BCH de la siguiente manera. /retirar <cartera> <0.0001>`
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

    await reply(`Usted ha retirado ${amountText}: ${url}`);
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
