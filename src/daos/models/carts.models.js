import { Schema, model } from "mongoose";

const cartsCollection = "carts";

const cartsSchema = new Schema({
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: Number,
      },
    ],
  },
});

cartsSchema.pre("findOne", function () {
  this.populate("products.product");
});

const cartsModel = model(cartsCollection, cartsSchema);

export default cartsModel;
