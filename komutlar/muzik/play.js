const { PermissionsBitField } = require("discord.js");

module.exports = {
  config: {
    name: "play",
    aliases: ["pplay", "p", "çal", "oynat"],
    description: "Belirttiğiniz şarkıyı sizin için çalar.",
    kategori: "muzik",
  },
  run: async (client, message, args) => {
    const { channel } = message.member.voice;
    if (!channel)
      return message.channel.send(
        "**şşş Sakin ol! Şimdi sana müzik dinleyebilmen için yapman gerekenleri hızlıca aktaracağım:** \n 1- Önce derin bir nefes al.. \n 2- Kendine bir papatya çayı hazırla.. \n 3- Bir ses kanalına katıl."
      );
    if (
      !message.guild.members.cache
        .get(client.user.id)
        .permissionsIn(channel)
        .has(PermissionsBitField.Flags.Connect)
    )
      return message.channel.send(` ${channel.name} Bu kanala bağlanamam!`);
    if (
      !message.guild.members.cache
        .get(client.user.id)
        .permissionsIn(channel)
        .has(PermissionsBitField.Flags.Speak)
    )
      return message.channel.send(` ${channel.name} Bu kanalda konuşamam!`);

    const string = args.join(" ");
    if (!string) {
      return message.channel.send(
        "Bi şarkı adı yada ne bileyim bi link falan yok mu?"
      );
    }

    const options = {
      member: message.member,
      textChannel: message.channel,
      message,
    };

    await client.distube.play(message.member.voice.channel, string, options);
  },
};
