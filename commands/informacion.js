const { version } = require('../package.json');

module.exports = async ({ ctx, fetchRpc, userId, isPm, reply }) => {
  await ctx.maybeReplyFromStickerSet('about');

  await reply(
    [
      `Soy un bot (v${version}) creado por Andreas Brekken (@abrkn) para enviar Bitcoin Cash (BCH) como propina en Telegram`,
      'Pruebe enviándome el comando /ayuda a través de un mensaje privado',
      `Si me envías una propina, la misma irá a parar a los fondos del grifo de Bitcoin Cash (cuando esté listo)`,
      `Soy una aplicación de código abierto: https://github.com/abrkn/tipmebch`,
      `Reporta errores aquí: https://github.com/abrkn/tipmebch/issues`,
      `El bot no esta diseñado para ser utilizado como cartera. Usted podría perder el saldo que tiene depositado en él a causa de un error`,
    ].join('\n')
  );
};
