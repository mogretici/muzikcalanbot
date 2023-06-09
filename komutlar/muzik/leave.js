const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "leave",
    aliases: ["lev", "stop", "dc", "ayrıl"],
    description: "Bot kanaldan ayrılır.",
    kategori: "muzik",
  },
  run: async (client, message, args) => {
    const msg = await message.channel.send(
      "Yüklüyorum kardeşim bi sakin ol.. Papatya çayı içmeni öneririm.."
    );
    const queue = client.distube.getQueue(message);

    if (!queue) return msg.edit(`Şarkı markı yok kardeşim kalmadı!`);
    const clientVoice = message.guild.members.me.voice.channel;
    const memberVoice = message.member.voice.channel;

    if (clientVoice === memberVoice) {
      if (queue) {
        client.distube.stop(message);
        client.distube.voices.leave(message.guild);
      } else {
        client.distube.voices.leave(message.guild);
      }

      const embed = new EmbedBuilder()
        .setDescription(
          `\`🚫\` | **hoşçağalın gidiyom ben..**`
        )
        .setColor("#000001");

      msg.edit({ content: " ", embeds: [embed] });
    }
  },
};
