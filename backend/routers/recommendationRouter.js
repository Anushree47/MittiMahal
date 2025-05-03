const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const UserActivity = require("../models/UserActivityModel");

// GET /api/user/recommendations?userId=xyz
router.get("/recommendations", async (req, res) => {
  const { userId } = req.query;

  if (!userId) return res.status(400).json({ message: "User ID is required" });

  try {
    // Fetch recent product views/searches by user
    const activity = await UserActivity.findOne({ userId });

    if (!activity || activity.recentlyViewed.length === 0) {
      // fallback: return trending or new products
      const fallbackProducts = await Product.find({})
        .sort({ createdAt: -1 }) // or use views: -1
        .limit(8);
      return res.json({ recommendations: fallbackProducts });
    }

    // Extract categories from recently viewed items
    const categories = [...new Set(activity.recentlyViewed.map(item => item.category))];

    // Recommend products based on those categories
    const recommended = await Product.find({
      category: { $in: categories },
      _id: { $nin: activity.recentlyViewed.map(item => item._id) }
    })
      .limit(8);

    res.json({ recommendations: recommended });
  } catch (error) {
    console.error("Recommendation Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
