import mongoose from "mongoose";

const connectDB = async (req, resp) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connect successfully");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
