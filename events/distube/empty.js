const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue) => {
  const embed = new EmbedBuilder()
    .setColor("#000001")
    .setDescription(`**PİŞT PİŞT KİMSE YOK MUUU!**`);

  queue.textChannel.send({ embeds: [embed] });
};
