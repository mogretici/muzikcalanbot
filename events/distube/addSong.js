const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, song) => {
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
