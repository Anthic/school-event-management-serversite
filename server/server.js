require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const eventRoutes = require("./routes/eventRouters");

const app = express();



app.use(
  cors({
    origin:process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api", require("./routes"));

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("😁 connected to databased");
  })
  .catch((error) => {
    console.log("😓 error connecting to database", error);
  });

//start server
app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});

module.exports = app;
