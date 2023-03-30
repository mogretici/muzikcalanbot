const figlet = require("figlet");
const config = require("../../config.js");
const { ActivityType } = require("discord.js");
module.exports = async (client) => {
  figlet(client.user.tag, function (err, data) {
    if (err) {
      console.log("hata var kontrol edin (ready)");
      console.dir(err);
      return;
    }
    console.log(data);
  });

  setInterval(
    () =>
      client.user.setActivity({
        name: `${config.status} 'İ, CAN-I GÖNÜLDEN`,
        type: ActivityType.Listening,
      }),
    10000
  );
};
