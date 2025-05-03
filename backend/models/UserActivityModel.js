const mongoose = require("mongoose");

const userActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  recentlyViewed: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      category: String,
      viewedAt: Date
    }
  ]
});

module.exports = mongoose.model("UserActivity", userActivitySchema);
