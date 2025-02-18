import express from "express";
import bodyParser from "body-parser";
import cors from "cors";  // Import cors
import userRoutes from "./routes/user.route";

const app = express();
const PORT = 5000;

// ✅ Enable CORS for all requests
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
