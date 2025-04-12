import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    console.log("url",process.env.MONGOURI);
    
    const con = await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
    
    });
    console.log("Connected established:", con.connection.host);
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
