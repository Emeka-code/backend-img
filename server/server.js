require("./Connect/Connect");
const express = require("express");
const cors = require("cors");
const PORT = 7777;
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({ message: "my api to build" });
});
app.listen(PORT, () => {
  console.log(`Connecting to .... ${PORT}`);
});
