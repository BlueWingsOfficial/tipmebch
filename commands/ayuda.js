module.exports = async ({ ctx, fetchRpc, userId, isPm, reply }) => {
  if (!isPm) {
    console.log({ isPm });
    await reply('El comando /ayuda solo funciona en un mensaje privado para mí.');
    return;
  }

  await reply(
    [
      '/propina $1.23 - Enviar propina',
      '/propina 0.0001 - Enviar propina (BCH)',
      '/saldo - Muestra su saldo',
      '/deposito - Muestra tu dirección de depósito (PM)',
      '/retirar <cartera> [<Cantidad de BCH>|$<Cantidad de USD>|all> - Retirar fondos',
      '/Estadisticas - Te muestras las estadísticas en relación a las propinas',
      '/ayuda - Te muestra los comandos',
      '/informacion - Informacion sobre el bot',
      '/EstablecerStikers [name] - Establecer pack de sticker para el canal (pepe or none)',
    ].join('\n')
  );
};
