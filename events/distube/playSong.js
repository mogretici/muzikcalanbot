const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = async (client, queue, track) => {
  var newQueue = client.distube.getQueue(queue.id);
  var data = disspace(newQueue, track);

  const nowplay = await queue.textChannel.send(data);

  const filter = (message) => {
    if (
      message.guild.members.me.voice.channel &&
      message.guild.members.me.voice.channelId ===
        message.member.voice.channelId
    )
      return true;
    else {
      message.reply({
        content:
          "**şşş Sakin ol! Şimdi sana müzik dinleyebilmen için yapman gerekenleri hızlıca aktaracağım:** \n 1- Önce derin bir nefes al.. \n 2- Kendine bir papatya çayı hazırla.. \n 3- Bir ses kanalına katıl.",
        ephemeral: true,
      });
    }
  };
  const collector = nowplay.createMessageComponentCollector({
    filter,
    time: 120000,
  });

  collector.on("collect", async (message) => {
    const id = message.customId;
    const queue = client.distube.getQueue(message.guild.id);
    if (id === "pause") {
      if (!queue) {
        collector.stop();
      }
      if (queue.paused) {
        await client.distube.resume(message.guild.id);
        const embed = new EmbedBuilder()
          .setColor("#000001")
          .setDescription(`\`⏯\` | **Şarkı:** \`Devam Ettiriliyor\``);

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        await client.distube.pause(message.guild.id);
        const embed = new EmbedBuilder()
          .setColor("#000001")
          .setDescription(`\`⏯\` | **Şarkı:** \`Duraklatıldı\``);

        message.reply({ embeds: [embed], ephemeral: true });
      }
    } else if (id === "skip") {
      if (!queue) {
        collector.stop();
      }
      if (queue.songs.length === 1 && queue.autoplay === false) {
        const embed = new EmbedBuilder()
          .setColor("#000001")
          .setDescription("`🚨` | **Kuyrukta **`Şarkı`** bulunamadı!");

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        await client.distube.skip(message).then((song) => {
          const embed = new EmbedBuilder()
            .setColor("#000001")
            .setDescription("`⏭` | **GEÇ KARDEŞİM YOK MU BAŞKA ŞARKI?**");

          nowplay.edit({ components: [] });
          message.reply({ embeds: [embed], ephemeral: true });
        });
      }
    } else if (id === "stop") {
      if (!queue) {
        collector.stop();
      }

      await client.distube.stop(message.guild.id);

      const embed = new EmbedBuilder()
        .setDescription(`\`🚫\` | **Şarkı:** | \`Durduruldu!\``)
        .setColor("#000001");

      await nowplay.edit({ components: [] });
      message.reply({ embeds: [embed], ephemeral: true });
    } else if (id === "loop") {
      if (!queue) {
        collector.stop();
      }
      if (queue.repeatMode === 0) {
        client.distube.setRepeatMode(message.guild.id, 1);
        const embed = new EmbedBuilder()
          .setColor("#000001")
          .setDescription(`\`🔁\` | **Loop Başarıyla Aktif Edildi!**`);

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        client.distube.setRepeatMode(message.guild.id, 0);
        const embed = new EmbedBuilder()
          .setColor("#000001")
          .setDescription(`\`🔁\` | **Loop Devredışı!**`);

        message.reply({ embeds: [embed], ephemeral: true });
      }
    } else if (id === "previous") {
      if (!queue) {
        collector.stop();
      }
      if (queue.previousSongs.length == 0) {
        const embed = new EmbedBuilder()
          .setColor("#000001")
          .setDescription("`🚨` | **Önceden çalınan şarkı bulunamadı!**");

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        await client.distube.previous(message);
        const embed = new EmbedBuilder()
          .setColor("#000001")
          .setDescription(
            "`⏮` | **Önceki çalınan şarkıya başarıyla geçilmiştir**"
          );

        nowplay.edit({ components: [] });
        message.reply({ embeds: [embed], ephemeral: true });
      }
    }
  });
  collector.on("end", async (collected, reason) => {
    if (reason === "time") {
      nowplay.edit({ components: [] });
    }
  });
};

function disspace(nowQueue, nowTrack) {
  let hatisReplikleri = [
    "PARDON BİŞE SORUCAM ERKOLAR KAPATILDI MI?",
    "KÖRDÜĞÜMÜ MÜ ÇALAYIM YOKSA BAŞKA ŞARKI MI DİNLİYCEZ?",
    "PAPATYA ÇAYINI ALDIYSAN ŞARKINI BAŞLATIYORUM HATİS",
    "YARIN BENİM DE YENİ HAYATIMIN İLK GÜNÜ OLUCAK HATİS ÇOK HEYECANLIYIM",
    "PAPATYA ÇAYI İÇMENİ ÖNERİRİM!! ",
  ];
  let oznurReplikleri = [
    "OO ÖZNUR HANIM DJ OLDUĞUNUZ AKLINIZA GELDİ ANLAŞILAN.",
    "SAGOPA MI DİNLİYORUZ YİNE?",
    "DJ BUGÜN İYİ ÇALIŞIYOR",
    "SUNUCU MASRAFLARINDAN MUAF OLMAK İSTİYORSAN DAHA FAZLA ŞARKI ÇALMALISIN ÖZNUR",
  ];
  let aymelekReplikleri = [
    "KESİN YİNE HURDA MURDA BİŞİ ÇALDIRIYOR BANA İMDAAAAT",
    "HAAANIM İZİN VERDİYSE ŞARKIYI BAŞLATIYORUM",
    "KAFAM KARIŞTI SANIRIM DEVAYA BASICAM",
    "UMARIM YİNE TROLL BİR ŞARKI ÇALMIYORUMDUR AYMELEK AHMET SALİH",
  ];
  let furkanReplikleri = [
    "FURKAN GELDİYSE BEN NEDEN DAILY MIX ÇALMIYORUM? ",
    "SERVETE SERVET GÖRÜNCE ALMAYI UNUTMAYIN İYİ OYUNLAR",
    "OYUNDA KAZANMANIN SIRRI DOĞRU EKONOMİ ABİ",
    "GÜZEL KADINLAR DM ATABİLİR",
  ];

  let hatis =
    hatisReplikleri[Math.floor(Math.random() * hatisReplikleri.length)];
  let oznur =
    oznurReplikleri[Math.floor(Math.random() * oznurReplikleri.length)];
  let aymelek =
    aymelekReplikleri[Math.floor(Math.random() * aymelekReplikleri.length)];
  let furkan =
    furkanReplikleri[Math.floor(Math.random() * furkanReplikleri.length)];
  console.log(nowTrack.user.username);

  const embeded = new EmbedBuilder()
    .setAuthor({
      name: `${
        nowTrack.user.username == "powerofhydrogen" ||
        song.user.discriminator == "4963"
          ? hatis
          : nowTrack.user.username == "hilariy" ||
            song.user.discriminator == "9428"
          ? oznur
          : nowTrack.user.username == "MooonAngel" ||
            song.user.discriminator == "3420"
          ? aymelek
          : nowTrack.user.username == "FUURRKKAANN" ||
            song.user.discriminator == "3314"
          ? furkan
          : "Şarkı çalıyor.."
      }`,
      iconURL: "https://cdn.discordapp.com/emojis/741605543046807626.gif",
    })
    .setThumbnail(nowTrack.thumbnail)
    .setColor("#000001")
    .setDescription(`**[${nowTrack.name}](${nowTrack.url})**`)
    .addFields({
      name: `Yükleyici:`,
      value: `**[${nowTrack.uploader.name}](${nowTrack.uploader.url})**`,
      inline: true,
    })
    .addFields({
      name: `Şarkıyı isteyen:`,
      value: `${nowTrack.user}`,
      inline: true,
    })
    .addFields({
      name: `Ses Seviyesi:`,
      value: `${nowQueue.volume}%`,
      inline: true,
    })
    .addFields({
      name: `Filtre:`,
      value: `${nowQueue.filters.names.join(", ") || "Normal"}`,
      inline: true,
    })
    .addFields({
      name: `Autoplay:`,
      value: `${nowQueue.autoplay ? "Aktif" : "Devre Dışı"}`,
      inline: true,
    })
    .addFields({
      name: `Toplam Süre:`,
      value: `${nowQueue.formattedDuration}`,
      inline: true,
    })
    .addFields({
      name: `Şuanki Süre: \`[0:00 / ${nowTrack.formattedDuration}]\``,
      value: `\`\`\`🔴 | 🎶──────────────────────────────\`\`\``,
      inline: false,
    })
    .setTimestamp();

  const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("pause")
        .setLabel(`Duraklat`)
        .setEmoji("⏯")
        .setStyle(ButtonStyle.Success)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("previous")
        .setLabel(`Önceki Şarkı`)
        .setEmoji("⬅")
        .setStyle(ButtonStyle.Primary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("stop")
        .setLabel(`Durdur`)
        .setEmoji("✖")
        .setStyle(ButtonStyle.Danger)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("skip")
        .setLabel(`Şarkıyı Geç`)
        .setEmoji("➡")
        .setStyle(ButtonStyle.Primary)
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId("loop")
        .setLabel(`Loop`)
        .setEmoji("🔄")
        .setStyle(ButtonStyle.Success)
    );
  return {
    embeds: [embeded],
    components: [row],
  };
}
