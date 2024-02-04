import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productsSchema = new Schema({
  title: {
    type: String,
    index: true,
  },
  description: String,
  price: Number,
  thumbnail: String,
  code: String,
  stock: Number,
  category: {
    type: String,
    index: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

productsSchema.plugin(paginate);

const productsModel = model(productsCollection, productsSchema);

export default productsModel;
