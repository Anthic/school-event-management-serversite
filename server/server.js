require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const eventRoutes = require("./routes/eventRouters");

const app = express();

const allowedOrigins = process.env.CLIENT_URL.split(",");
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

//user add routers
app.use("/api/auth", require("./routes/authRoutes"));

//events add routers
app.use("/api", eventRoutes);
app.use("/api", require("./routes/userRouters"));

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
