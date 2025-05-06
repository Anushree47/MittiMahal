const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  recentlyViewed: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      category: String,
      viewedAt: Date
    }
  ]
});

module.exports = mongoose.model("UserActivity", userActivitySchema);
