const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "loop",
    aliases: ["repeat"],
    description: "Şarkıları sürekli tekrar çalmaya ayarlar.",
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

    if (queue.repeatMode === 0) {
      client.distube.setRepeatMode(message, 1);
      const embed = new EmbedBuilder()
        .setColor("#000001")
        .setDescription(`\`🔁\` | **Sürekli aynı şarkıyı dinlemekten bıkmayacak mısın cidden?**`);

      msg.edit({ content: " ", embeds: [embed] });
    } else {
      client.distube.setRepeatMode(message, 0);
      const embed = new EmbedBuilder()
        .setColor("#000001")
        .setDescription(`\`🔁\` | **Bence de kapatalım artık loopu!**`);

      msg.edit({ content: " ", embeds: [embed] });
    }
  },
};
