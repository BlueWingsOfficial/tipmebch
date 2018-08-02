module.exports = async ({ ctx, reply, username }) => {
  await ctx.maybeReplyFromStickerSet('claim');

  await ctx.reply(
    `Esta Listo! A partir de ahora @${username} no necesita \`/claim\` para recibir consejo`,
    { parse_mode: 'markdown' }
  );
};
