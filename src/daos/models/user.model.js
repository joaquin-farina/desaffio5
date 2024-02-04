import { Schema, model } from "mongoose";

const usersCollection = "users";

const usersSchema = new Schema({
  firs_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const usersModel = model(usersCollection, usersSchema);

export default usersModel;
