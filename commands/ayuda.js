module.exports = async ({ ctx, fetchRpc, userId, isPm, reply }) => {
  if (!isPm) {
    console.log({ isPm });
    await reply('El comando /ayuda solo funciona en un mensaje privado para mí.');
    return;
  }

  await reply(
    [
      '/propina $1.23 - Enviar sugerencia',
      '/propina 0.0001 - Enviar sugerencia (BCH)',
      '/saldo - Muestra su saldo',
      '/deposito - Muestra tu dirección de depósito (PM)',
      '/retirar <billetera> [<Cantidad de BCH>|$<Cantidad de USD>|all> - Retirar fondos',
      '/Estadisticas - Mostrar las estadísticas de inflexión',
      '/ayuda - Está en ayuda',
      '/informacion - Informacion sobre el bot',
      '/EstablecerStikers [name] - Establecer pack de stickerpara el canal (pepe or none)',
    ].join('\n')
  );
};
