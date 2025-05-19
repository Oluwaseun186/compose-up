
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Use MONGODB_URI from environment or default fallback
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mydb";

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ Mongoose connected to MongoDB");

    // Start server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

// Sample API route (you can add more as needed)
app.get("/api/", async (req, res) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({ collections });
  } catch (err) {
    res.status(500).json({ error: "Failed to list collections" });
  }
});
