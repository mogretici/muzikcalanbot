module.exports = (client, id) => {
  console.log(
    `[${String(new Date())
      .split(" ", 5)
      .join(" ")}] || ==> || Shard #${id} Yeniden Bağlanıyor`
  );
};