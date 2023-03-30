const { EmbedBuilder } = require("discord.js");

module.exports = async (client, message, result, query) => {
  let i = 0;
  let embed = new EmbedBuilder()
    .setColor("#000001")
    .setTitle(`Şarkı Seçebilirsin`)
    .setDescription(
      `${result
        .map(
          (song) =>
            `**(${++i}.) [${song.name}](${song.url})** - \`${
              song.formattedDuration
            }\``
        )
        .join("\n")}`
    )
    .setFooter({ text: `30 Saniyen var çabuuk!` });

  message.channel.send({ embeds: [embed] });
};
