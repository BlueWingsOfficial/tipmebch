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
    return reply(`Lo siento, @ $ {username}, pero no eres administrador en este chat.`);
  }

  const knownSets = Object.keys(stickers);

  const [setName] = params;

  if (!setName) {
    return reply(
      `El comando que has usado no ha sido escrito correctamente. Try this: /EstablecerSticker <${knownSets.join('|')}>`
    );
  }

  if (!knownSets.includes(setName)) {
    return reply(
      `No sé ese conjunto. Pruebe esto: / establecerSticker <$ {knownSets.join ('|')}> `
    );
  }

  await redisClient.set(
    `telegram.chat.settings:${ctx.chat.id}.sticker_set`,
    setName
  );

  await reply(
    `Bien, @ $ {username}, este chat ahora usará el pack de sticker $ {setName} `
  );
};
