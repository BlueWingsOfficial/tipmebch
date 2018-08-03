const debug = require('debug')('tipmebch');
const { createQrCode, getAddressForUser } = require('../utils');

module.exports = async ({ ctx, fetchRpc, userId, isPm, reply }) => {
  if (!isPm) {
    console.log({ isPm });
    await reply('Este comando sólo funciona si me lo envías por mensaje privado.');
    return;
  }

  debug(`Looking up deposit address for ${userId}`);

  const address = await getAddressForUser(userId, {
    fetchRpc,
  });

  const qr = await createQrCode(address);

  console.log(typeof qr, Buffer.isBuffer(qr));

  await ctx.replyWithMediaGroup([
    {
      media: { source: qr },
      type: 'photo',
      caption: `Escanea este código QR para depositar`,
    },
  ]);

  await ctx.reply(`Para hacer depósitos en Bitcoin Cash (BCH), envíelos a:`);

  await ctx.reply(address);
};
