const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "resume",
    aliases: ["re", "devamet", "devam-et"],
    description: "Şarkıyı devam ettirir.",
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
      await client.distube.resume(message);

      const embed = new EmbedBuilder()
        .setColor("#000001")
        .setDescription(`\`⏯\` | **Nerde kalmıştık?**`);

      msg.edit({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setColor("#000001")
        .setDescription(`\`⏯\` | **Sıradan devam ediyorum ben o zaman**`);

      msg.edit({ embeds: [embed] });
    }
  },
};
