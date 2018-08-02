module.exports = async ({ ctx, reply, username }) => {
  await ctx.maybeReplyFromStickerSet('claim');

  await ctx.reply(
    `¡Está Hecho! @${username} A partir de ahora  no necesita usar el comando \`/reclamar\` para recibir propinas`,
    { parse_mode: 'markdown' }
  );
};
