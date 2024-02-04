import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect("mongodb+srv://joaquin:mingui2024@coderhouse.uruhgmj.mongodb.net/ecommerce?retryWrites=true&w=majority");
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
