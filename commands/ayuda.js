module.exports = async ({ ctx, fetchRpc, userId, isPm, reply }) => {
  if (!isPm) {
    console.log({ isPm });
    await reply('El comando /ayuda solo funciona en un mensaje privado para mí.');
    return;
  }

  await reply(
    [
      '/propina $1.23 - Enviar propina(Expresando la cantidad en dólares)',
      '/propina 0.0001 - Enviar propina (Expresando la cantidad en Bitcoin Cash)',
      '/saldo - Muestra su saldo',
      '/deposito - Te genera una dirección de deposito (PM)',
      '/retirar <cartera> [<Cantidad de BCH>|$<Cantidad de USD>|all> - Te permite retirar tus BCH',
      '/Estadisticas - Te muestras las estadísticas en relación a las propinas',
      '/ayuda - Te muestra los comandos',
      '/informacion - Informacion sobre el bot',
      '/setstickerset [name] - Set sticker set for channel (pepe or none)',
    ].join('\n')
  );
};
