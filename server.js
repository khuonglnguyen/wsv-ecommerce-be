const app = require("./src/app");

const server = app.listen(4002, () => {
  console.log("WSV eCommerce start with 4002");
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Exit!");
  });
});
