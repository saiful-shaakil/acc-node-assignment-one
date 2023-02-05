const express = require("express");
const app = express();
const port = 5000 || process.env.PORT;
const usersRoute = require("./routes/user.routes.js");
app.use(express.json());

app.use("/user", usersRoute);
app.get("/", (req, res) => {
  res.send("The server is running.");
});
app.listen(port, () => {
  console.log("The app is running.", port);
});

module.exports = app;
