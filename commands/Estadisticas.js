const { formatUsd } = require('../utils');

module.exports = async ({ reply, redisClient, ctx }) => {
  const [
    tippedBch,
    tippedUsd,
    tippedCount,
    withdrawnBch,
    withdrawnUsd,
    withdrawnCount,
    introCount,
  ] = await Promise.all([
    redisClient.getAsync('stats.tipped.bch'),
    redisClient.getAsync('stats.tipped.usd'),
    redisClient.getAsync('stats.tipped.count'),
    redisClient.getAsync('stats.withdrawn.bch'),
    redisClient.getAsync('stats.withdrawn.usd'),
    redisClient.getAsync('stats.withdrawn.count'),
    redisClient.getAsync('stats.intros.count'),
  ]);

  await ctx.maybeReplyFromStickerSet('stats');

  await reply(
    [
      `${introCount || 0} Se han presentado a mi`,
      `Los usuarios han enviado propinas ${tippedCount || 0} veces, por un total de ${tippedBch ||
        0} BCH (${formatUsd(tippedUsd || 0)})`,
      `${withdrawnBch || 0} BCH (${formatUsd(
        withdrawnUsd || 0
      )}) Han retirado un total ${withdrawnCount || 0}`,
    ].join('\n')
  );
};
