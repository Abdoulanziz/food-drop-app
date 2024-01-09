require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const webPush = require("web-push");

const { PORT, NODE_ENV, SESSION_SECRET, DB_CONNECTION_STRING, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY } = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

const nodeEnv = NODE_ENV || "production";
const port = PORT || 5000;
const dbURI = nodeEnv === "development" ? "mongodb://127.0.0.1:27017/food_drop_db_demo" : DB_CONNECTION_STRING;

mongoose.set("strictQuery", true);
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    })
  )
  .catch(() => console.log("Connection failure!"));

app.use(
  session({
    name: "app.connect.sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: dbURI }),
    cookie: { httpOnly: false, maxAge: null },
  })
);

webPush.setVapidDetails("mailto:web-push@food-drop.com", VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

app.use("/*", require("../routes/pageRoutes"));