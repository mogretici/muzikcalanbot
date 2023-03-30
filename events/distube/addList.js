const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, playlist) => {
  const embed = new EmbedBuilder()
    .setDescription(
      `Madem ${playlist.user} istedi. E biz de (${playlist.songs.length} tracks) dakika boyunca [${playlist.name}](${playlist.url})** \`${queue.formattedDuration}\` dinleyelim.`
      // `**Şarkı kuyruğa eklendi • [${playlist.name}](${playlist.url})** \`${queue.formattedDuration}\` (${playlist.songs.length} tracks) • ${playlist.user}`
    )
    .setColor("#000001");

  queue.textChannel.send({ embeds: [embed] });
};
