const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "pause",
    aliases: ["pa", "duraklat"],
    description: "Çalan şarkıyı duraklatır.",
    kategori: "muzik",
  },
  run: async (client, message, args) => {
    const msg = await message.channel.send(
      "Yüklüyorum kardeşim bi sakin ol.. Papatya çayı içmeni öneririm.."
    );

    const queue = client.distube.getQueue(message);
    if (!queue) msg.edit(`Şarkı markı yok kardeşim kalmadı!`);
    const { channel } = message.member.voice;
    if (
      !channel ||
      message.member.voice.channel !== message.guild.members.me.voice.channel
    )
      return msg.edit("Gel kardeşim benimle aynı kanalda olman lazım!");

    if (queue.paused) {
      const embed = new EmbedBuilder()
        .setColor("#000001")
        .setDescription(`\`⏯\` | **Şarkı:** \`Duraklatıldı\``);

      msg.edit({ content: " ", embeds: [embed] });
    } else {
      client.distube.pause(message);
      const embed = new EmbedBuilder()
        .setColor("#000001")
        .setDescription(`\`⏯\` | **Şarkı:** \`Duraklatıldı\``);

      msg.edit({ content: " ", embeds: [embed] });
    }
  },
};
