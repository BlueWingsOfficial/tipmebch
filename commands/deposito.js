const debug = require('debug')('tipmebch');
const { createQrCode, getAddressForUser } = require('../utils');

module.exports = async ({ ctx, fetchRpc, userId, isPm, reply }) => {
  if (!isPm) {
    console.log({ isPm });
    await reply('That command only works in a private message to me.');
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

  await ctx.reply(`Para depositar Bitcoin Cash (BCH), envíe a:`);

  await ctx.reply(address);
};
