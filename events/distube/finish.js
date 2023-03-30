const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue) => {
  const embed = new EmbedBuilder()
    .setDescription(`\`📛\` | **HEY BURDA DJ YOK MU BU ŞARKI BİTTİ!**`)
    .setColor("#000001");

  queue.textChannel.send({ embeds: [embed] });
};
