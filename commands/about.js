const { version } = require('../package.json');

module.exports = async ({ ctx, fetchRpc, userId, isPm, reply }) => {
  await ctx.maybeReplyFromStickerSet('about');

  await reply(
    [
      `Soy un bot (v${version}) escrito por Andreas Brekken (@abrkn) para inclinar Bitcoin Cash (BCH) en Telegram`,
      'Pruebe el comando /help en un mensaje privado',
      `Puede darme propina y se irá al grifo una vez esté listo.`,
      `Soy un código abierto: https://github.com/abrkn/tipmebch`,
      `Reportar errores aquí: https://github.com/abrkn/tipmebch/issues`,
      `El bot no es una billetera. Sus fondos se perderán si hay errores`,
    ].join('\n')
  );
};
