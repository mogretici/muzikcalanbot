const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "replay",
    aliases: ["tekrarla", "tekrar"],
    description: "Çalan şarkıyı tekrarlar.",
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

    await queue.seek(0);

    const embed = new EmbedBuilder()
      .setColor("#000001")
      .setDescription("`🔁` | **Şarkı güzeldi ya aynen tekrar dinleyelim**");

    msg.edit({ content: " ", embeds: [embed] });
  },
};
