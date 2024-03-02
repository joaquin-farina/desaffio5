import { Schema, model } from "mongoose";

const usersCollection = "users";

const usersSchema = new Schema({
  firstname: String,
  lastname: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  age: Number,
  cartId: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const usersModel = model(usersCollection, usersSchema);

export default usersModel;