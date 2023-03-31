const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "volume",
    aliases: ["vol", "v", "ses"],
    description: "Şarkının ses seviyesini ayarlar.",
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

    const volume = parseInt(args[0]);

    if (!volume) {
      const embed = new EmbedBuilder()
        .setColor("#000001")
        .setDescription(`Şu anki **ses seviyesi** : \`%${queue.volume}\``);

      return msg.edit({ content: " ", embeds: [embed] });
    }

    if (isNaN(volume)) {
      const embed = new EmbedBuilder()
        .setColor("#000001")
        .setDescription(`SAYI KANKA, SAYI GİR, SAYI HANİ 1,2,3.. FALAN`);

      return msg.edit({ content: " ", embeds: [embed] });
    }

    if (Number(volume) < 1 || Number(volume) > 100)
      return msg.edit(`1-100 arasında bi sayı girersen çok memnun olurum canım kardeşim.`);

    client.distube.setVolume(message, volume);

    const embed = new EmbedBuilder()
      .setColor("#000001")
      .setDescription(
        `\`🔊\` | **Tamam sesi \`%${args[0]}\` yaptım!**`
      );

    msg.edit({ content: " ", embeds: [embed] });
  },
};
