const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { DisTube } = require("distube");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require("@distube/yt-dlp");

class MainClient extends Client {
  constructor() {
    super({
      shards: "auto",
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
      ],
      allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: false,
      },
    });

    process.on("unhandledRejection", (error) => console.log(error));
    process.on("uncaughtException", (error) => console.log(error));

    this.config = require("./config.js");
    this.prefix = this.config.PREFIX;
    this.sahip = this.config.OWNER;
    if (!this.token) this.token = this.config.TOKEN;

    const client = this;
    client.on("messageCreate", async (message) => {
      if (message.author.bot) return;
      if (
        message.channel.id === "1095034709626597456" &&
        message.attachments.size > 0
      ) {
        const reply = await message.reply({
          content: `ASLINDA TEK İŞİM MÜZİK ÇALMAK AMA MADEM SINAVINIZ VAR YARDIMCI OLAYIM BARİ :)\n\n Doğru seçeneğin hangisi olduğunu düşünüyorsunuz?`,
          allowedMentions: { repliedUser: false },
        });
        const reactions = ["🇦", "🇧", "🇨", "🇩", "🇪"];
        for (let i = 0; i < reactions.length; i++) {
          await reply.react(reactions[i]);
        }
      }
    });

    this.distube = new DisTube(client, {
      searchSongs: 0, //* Arama modu için: 5
      searchCooldown: 30,
      leaveOnEmpty: true,
      emptyCooldown: 180,
      leaveOnFinish: false,
      leaveOnStop: false,
      plugins: [
        new SoundCloudPlugin(),
        new SpotifyPlugin({
          emitEventsAfterFetching: true,
        }),
        new YtDlpPlugin(),
      ],
    });

    ["aliases", "commands"].forEach((x) => (client[x] = new Collection()));
    ["loadCommands", "loadEvents", "loadDistube"].forEach((x) =>
      require(`./handlers/${x}`)(client)
    );
  }
  connect() {
    return super.login(this.token);
  }
}
module.exports = MainClient;
