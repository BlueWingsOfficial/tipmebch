module.exports = async ({ ctx, reply, username }) => {
  await ctx.maybeReplyFromStickerSet('claim');

  await ctx.reply(
    `¡Estás Listo! A partir de ahora @${username} no necesita \`/claim\` para recibir consejos`,
    { parse_mode: 'markdown' }
  );
};
