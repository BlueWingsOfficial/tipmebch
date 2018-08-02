const stickers = require('../stickers');

module.exports = async ({
  ctx,
  fetchRpc,
  userId,
  redisClient,
  isAdmin,
  params,
  reply,
  username,
}) => {
  if (!isAdmin) {
    return reply(`Lo siento, @ $ {NombreDeUsuario}, pero no eres administrador en este chat.`);
  }

  const knownSets = Object.keys(stickers);

  const [setName] = params;

  if (!setName) {
    return reply(
      `El comando que has usado no ha sido escrito correctamente. Intenta con el comando: /EstablecerSticker <${knownSets.join('|')}>`
    );
  }

  if (!knownSets.includes(setName)) {
    return reply(
      `No sé ese conjunto. Sugiero: /establecerSticker <$ {knownSets.join ('|')}> `
    );
  }

  await redisClient.set(
    `telegram.chat.settings:${ctx.chat.id}.sticker_set`,
    setName
  );

  await reply(
    `Bien, @ $ {NombreDeUsuario}, este chat ahora usará el pack de sticker $ {setName} `
  );
};
