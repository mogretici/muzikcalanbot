const delay = require("delay");

module.exports = async (client, id) => {
  await delay(2000);
  console.log(
    `[${String(new Date())
      .split(" ", 5)
      .join(" ")}] || ==> || Shard #${id} Hazır`
  );
};
