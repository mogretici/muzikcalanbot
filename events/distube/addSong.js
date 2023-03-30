const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, song) => {
  let embed = new EmbedBuilder()
    .setDescription(
      `** ${
        song.user.username == "hilariy" || song.user.discriminator == "9428"
          ? `OO ÖZNUR HANIM DJ OLDUĞUNUZ AKLINIZA GELDİ ANLAŞILAN. \n Tamam tamam 😅 \`${song.formattedDuration}\` dakikalık [${song.name}](${song.url}) şarkısını listeye ekledim.`
          : `Teşekkürler ${song.user} \`${song.formattedDuration}\` dakikalık [${song.name}](${song.url}) şarkısını listeye ekledim.`
      }**`
    )
    .setColor("#000001");

  queue.textChannel.send({ content: " ", embeds: [embed] });
};
