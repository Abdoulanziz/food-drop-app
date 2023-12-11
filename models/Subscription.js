const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
  {
    endpoint: String,
    keys: {
      p256dh: String,
      auth: String,
    },
  },
  { timestamps: true }
);

const subscriptionModel = mongoose.model("subscription", subscriptionSchema);

module.exports = subscriptionModel;
