const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  config: {
    name: "join",
    aliases: ["katıl"],
    description: "Bot ses kanalına çağır",
    kategori: "muzik",
  },
  run: async (client, message, args) => {
    const msg = await message.channel.send(
      "Yüklüyorum kardeşim bi sakin ol.. Papatya çayı içmeni öneririm.."
    );

    const { channel } = message.member.voice;
    if (
      !message.guild.members.cache
        .get(client.user.id)
        .permissionsIn(channel)
        .has(PermissionsBitField.Flags.Connect)
    )
      return message.channel.send(
        ` ${channel.name} Ben bu kanala bağlanmam!`
      );
    if (
      !message.guild.members.cache
        .get(client.user.id)
        .permissionsIn(channel)
        .has(PermissionsBitField.Flags.Speak)
    )
      return message.channel.send(
        ` ${channel.name} Ben bu kanalda konuşmam!`
      );

    const clientVoice = message.guild.members.me.voice.channel;
    const memberVoice = message.member.voice.channel;

    if (clientVoice) {
      if (clientVoice !== memberVoice) {
        const embed = new EmbedBuilder()
          .setColor("#000001")
          .setDescription(
            `${message.client.user} Önce bi kanala katılsan mı?`
          );

        return msg.edit({ content: " ", embeds: [embed] });
      } else {
        const embed = new EmbedBuilder()
          .setColor("#000001")
          .setDescription(`şş Alo Sesim Geli...!`);

        return msg.edit({ content: " ", embeds: [embed] });
      }
    } else {
      if (memberVoice) {
        client.distube.voices
          .join(memberVoice)
          .then((voice) => {
            const embed = new EmbedBuilder()
              .setColor("#000001")
              .setDescription(
                `\`🔊\` | **Bi uyutmadınız ya tamam geldim ** ( \`${memberVoice.name}\` )** !**`
              );

            msg.edit({ content: " ", embeds: [embed] });
          })
          .catch((error) => {
            console.log(e);
          });
      } else {
        const embed = new EmbedBuilder()
          .setColor("#000001")
          .setDescription(`Hadi git bi papatya çayı iç! Sonra gelip bir ses kanalına katıl!`);

        return msg.edit({ content: " ", embeds: [embed] });
      }
    }
  },
};
