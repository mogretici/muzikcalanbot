const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "autoplay",
    aliases: ["ap", "otomatikoynat", "oto-oynat", "otomatik-oynat"],
    description: "",
    kategori: "muzik",
  },
  run: async (client, message, args) => {
    const msg = await message.channel.send(
      "Yüklüyorum kardeşim bi sakin ol.. Papatya çayı içmeni öneririm.."
    );

    const queue = client.distube.getQueue(message);
    if (!queue) msg.edit(`Şu anda kuyrukta hiçbir şey yok.!`);
    const { channel } = message.member.voice;
    if (
      !channel ||
      message.member.voice.channel !== message.guild.members.me.voice.channel
    )
      return msg.edit(
        "Benimle aynı kanalda olursan müzik dinlemen daha kolay olur. Böyle uzaktan zor."
      );

    if (!queue.autoplay) {
      client.distube.toggleAutoplay(message);

      const embed = new EmbedBuilder()
        .setColor("#000001")
        .setDescription(`\`⏯\` **Tamam Otomatik Oynatıcam**`);

      msg.edit({ content: " ", embeds: [embed] });
    } else {
      client.distube.toggleAutoplay(message);

      const embed = new EmbedBuilder()
        .setColor("#000001")
        .setDescription(`\`⏯\` **Bence de bu kadar Otomatik Oynatma kafi**`);

      msg.edit({ content: " ", embeds: [embed] });
    }
  },
};
