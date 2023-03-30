const { readdirSync } = require("fs");
const delay = require("delay");

module.exports = async (client) => {
  try {
    readdirSync("./events/distube/").forEach((file) => {
      const event = require(`../events/distube/${file}`);
      let eventName = file.split(".")[0];
      client.distube.on(eventName, event.bind(null, client));
    });
  } catch (e) {
    console.log(e);
  }
  await delay(4000);
  console.log(`[BİLGİ] Distube Events Başarıyla Yüklendi!`);
};
