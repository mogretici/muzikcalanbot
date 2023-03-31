const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "skip",
    aliases: ["s"],
    description: "Çalan şarkıyı geçersiniz.",
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

    if (queue.songs.length === 1 && queue.autoplay === false) {
      const embed = new EmbedBuilder()
        .setColor("#000001")
        .setDescription("`🚨` | **ŞARKI MARKI YOK KARDEŞİM KALMADI!**");

      msg.edit({ content: " ", embeds: [embed] });
    } else {
      client.distube.skip(message).then((song) => {
        const embed = new EmbedBuilder()
          .setColor("#000001")
          .setDescription("`⏭` | **GEÇ KARDEŞİM YOK MU BAŞKA ŞARKI?**");

        msg.edit({ content: " ", embeds: [embed] });
      });
    }
  },
};
