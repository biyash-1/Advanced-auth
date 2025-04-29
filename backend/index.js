import express from "express";
import { connectDb } from "./db.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors"

const app = express();
app.use(cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: 'http://localhost:3000',  
  credentials: true,               
}))
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
const PORT = 5000;


app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

connectDb();
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});