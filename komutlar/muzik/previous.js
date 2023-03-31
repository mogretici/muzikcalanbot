const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "previous",
    aliases: ["prev", "önceki"],
    description: "Sıradaki önceki şarkıyı çalar.",
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

    if (queue.previousSongs.length == 0) {
      const embed = new EmbedBuilder()
        .setColor("#000001")
        .setDescription("`🚨` | **Bir önceki şarkı neydi ya?**");

      msg.edit({ content: " ", embeds: [embed] });
    } else {
      await client.distube.previous(message).then((song) => {
        const embed = new EmbedBuilder()
          .setColor("#000001")
          .setDescription(
            "`⏮` | **Aynen bu şarkı güzeldi tekrar dinleyelim**"
          );

        msg.edit({ content: " ", embeds: [embed] });
      });
    }
  },
};
