import { connect } from "mongoose";
import dotenv from 'dotenv'
import program from "../utils/commander.js";
import MongoSingleton from "../utils/mongoSingleton.js";

const { mode } = program.opts()

dotenv.config({
  path: mode === 'development' ? './.env.development' : './.env.production'
})

export const configObject = {
  port: process.env.PORT || 8080,
  mongo_url: process.env.MONGOURL,
  jwt_secret_Key: process.env.JWT_SECRET_KEY,
}

const connectDB = async () => {
  try {
    await MongoSingleton.getInstance()
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;