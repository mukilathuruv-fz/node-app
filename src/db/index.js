import { connect } from "mongoose";

const connectDb = async () => {
  try {
    const uri = process.env.DB_URI;
    await connect(uri);
    console.log("db connection established");
  } catch (err) {
    console.log(`while connecting database: ${err.message}`);
  }
};

export default connectDb;
