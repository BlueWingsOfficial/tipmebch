module.exports = async ({ ctx, reply, username }) => {
  await ctx.maybeReplyFromStickerSet('claim');

  await ctx.reply(
    `¡Está Hecho! @${username}, a partir de ahora  no necesitas usar el comando \`/reclamar\` para recibir propinas`,
    { parse_mode: 'markdown' }
  );
};
