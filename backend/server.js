const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Function to connect to MongoDB
const connectDB = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });

      console.log("✅ MongoDB Connected Successfully");

      mongoose.set("strictQuery", false); // Fix query buffering
  } catch (error) {
      console.error("❌ MongoDB Connection Failed:", error.message);
      process.exit(1); // Stop server if DB connection fails
  }
};

connectDB(); // Call the function to connect to MongoDB

// Test Route
app.get("/", (req, res) => {
    res.send("Hello, MERN Notes App with Authentication!");
});

// ✅ Use ONLY authRoutes.js (NOT auth.js)
const authRoutes = require("./routes/authRoutes"); 
const noteRoutes = require("./routes/noteRoutes");

app.use("/api/auth", authRoutes);  // Authentication routes (Register/Login)
app.use("/api/notes", noteRoutes); // Notes routes (protected)

// Start server after DB connection is successful
const PORT = process.env.PORT || 5000;
mongoose.connection.once("open", () => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});