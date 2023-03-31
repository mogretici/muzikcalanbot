const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, song) => {
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

  let embed = new EmbedBuilder()
    .setDescription(
      `** ${
        song.user.username == "powerofhydrogen" ||
        song.user.discriminator == "4963"
          ? `${hatis} \`${song.formattedDuration}\` dakikalık [${song.name}](${song.url}) şarkısını listeye ekledim.`
          : song.user.username == "hilariy" || song.user.discriminator == "9428"
          ? `${oznur} \`${song.formattedDuration}\` dakikalık [${song.name}](${song.url}) şarkısını listeye ekledim.`
          : song.user.username == "MooonAngel" ||
            song.user.discriminator == "3420"
          ? `${aymelek} \`${song.formattedDuration}\` dakikalık [${song.name}](${song.url}) şarkısını listeye ekledim.`
          : song.user.username == "FUURRKKAANN" ||
            song.user.discriminator == "3314"
          ? `${furkan} \`${song.formattedDuration}\` dakikalık [${song.name}](${song.url}) şarkısını listeye ekledim.`
          : `Teşekkürler ${song.user} \`${song.formattedDuration}\` dakikalık [${song.name}](${song.url}) şarkısını listeye ekledim.`
      }**`
    )
    .setColor("#000001");

  queue.textChannel.send({ content: " ", embeds: [embed] });
};
