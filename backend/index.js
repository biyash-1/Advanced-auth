import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db.js";
import authRoutes from "./routes/auth.js";
dotenv.config();

const app = express();
app.use(express.json());
const PORT = 3000;

// Correctly mount auth routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

connectDb();
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});