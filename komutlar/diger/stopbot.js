const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "restart",
    description: "bot kapatma!",
    kategori: "diger",
    aliases: ["stopbot"],
  },
  run: async (client, message, args) => {
    if (message.author.id != client.sahip)
      return message.channel.send("Heme");

    const restart = new EmbedBuilder()
      .setDescription("**İyi geceler!!!!**")
      .setColor("#000001");

    await message.channel.send({ embeds: [restart] });
    console.log("Merhaba Merhabaa");

    process.exit();
  },
};
