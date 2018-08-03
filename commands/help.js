module.exports = async ({ ctx, fetchRpc, userId, isPm, reply }) => {
  if (!isPm) {
    console.log({ isPm });
    await reply('El comando /ayuda solo funciona en un mensaje privado para mí.');
    return;
  }

  await reply(
    [
      '/tipbch $1.23 - Enviar propina (expresado la cantidad en dólares)',
      '/tipbch 0.0001 - Enviar propina (expresado la cantidad en Bitcoin Cash)',
      '/balance - Muestra su saldo',
      '/deposit - Te genera una dirección de deposito (sólo funciona si lo escribes al bot por mensaje privado)',
      '/withdraw <cartera> [<Cantidad de BCH>|$<Cantidad de USD>|all> - Te permite realizar retiros',
      '/stats - Te muestra las estadísticas en relación a las propinas',
      '/help - Te muestra los comandos',
      '/about - Informacion sobre el bot',
      '/setstickerset [name] - Set sticker set for channel (pepe or none)',
    ].join('\n')
  );
};
