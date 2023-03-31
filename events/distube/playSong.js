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
          .setDescription("`🚨` | **ŞARKI MARKI YOK KARDEŞİM KALMADI **!");

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
    "PARDON BİŞE SORUCAM ERKOLAR KAPATILDI MI?\n\n",
    "KÖRDÜĞÜMÜ MÜ ÇALAYIM YOKSA BAŞKA ŞARKI MI DİNLİYCEZ?\n\n",
    "PAPATYA ÇAYINI ALDIYSAN ŞARKINI BAŞLATIYORUM HATİS\n\n",
    "YARIN BENİM DE YENİ HAYATIMIN İLK GÜNÜ OLUCAK HATİS ÇOK HEYECANLIYIM\n\n",
    "PAPATYA ÇAYI İÇMENİ ÖNERİRİM!! \n\n",
  ];
  let oznurReplikleri = [
    "OO ÖZNUR HANIM DJ OLDUĞUNUZ AKLINIZA GELDİ ANLAŞILAN.\n\n",
    "SAGOPA MI DİNLİYORUZ YİNE?\n\n",
    "DJ BUGÜN İYİ ÇALIŞIYOR\n\n",
    "SUNUCU MASRAFLARINDAN MUAF OLMAK İSTİYORSAN DAHA FAZLA ŞARKI ÇALMALISIN ÖZNUR\n\n",
  ];
  let aymelekReplikleri = [
    "KESİN YİNE HURDA MURDA BİŞİ ÇALDIRIYOR BANA İMDAAAAT\n\n",
    "HAAANIM İZİN VERDİYSE ŞARKIYI BAŞLATIYORUM\n\n",
    "KAFAM KARIŞTI SANIRIM DEVAYA BASICAM\n\n",
    "UMARIM YİNE TROLL BİR ŞARKI ÇALMIYORUMDUR AYMELEK AHMET SALİH\n\n",
  ];
  let furkanReplikleri = [
    "FURKAN GELDİYSE BEN NEDEN DAILY MIX ÇALMIYORUM? \n\n",
    "SERVETE SERVET GÖRÜNCE ALMAYI UNUTMAYIN İYİ OYUNLAR\n\n",
    "OYUNDA KAZANMANIN SIRRI DOĞRU EKONOMİ ABİ\n\n",
    "GÜZEL KADINLAR DM ATABİLİR\n\n",
  ];

  let hatis =
    hatisReplikleri[Math.floor(Math.random() * hatisReplikleri.length)];
  let oznur =
    oznurReplikleri[Math.floor(Math.random() * oznurReplikleri.length)];
  let aymelek =
    aymelekReplikleri[Math.floor(Math.random() * aymelekReplikleri.length)];
  let furkan =
    furkanReplikleri[Math.floor(Math.random() * furkanReplikleri.length)];

  const embeded = new EmbedBuilder()
    .setAuthor({
      name: `${
        nowTrack.user.username == "powerofhydrogen" ||
        nowTrack.user.discriminator == "4963"
          ? hatis
          : nowTrack.user.username == "hilariy" ||
            nowTrack.user.discriminator == "9428"
          ? oznur
          : nowTrack.user.username == "MooonAngel" ||
            nowTrack.user.discriminator == "3420"
          ? aymelek
          : nowTrack.user.username == "FUURRKKAANN" ||
            nowTrack.user.discriminator == "3314"
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
