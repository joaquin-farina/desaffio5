import cartsModel from "../models/carts.models.js";

class CartManagerMongo {
  async getCart(cid) {
    try {
      return await cartsModel.findOne({ _id: cid });
    } catch (error) {
      console.error(error);
    }
  }

  async createCart() {
    try {
      return await cartsModel.create({ products: [] });
    } catch (error) {
      console.error(error);
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const cart = await cartsModel.findById({ _id: cid });
      cart.products.push({ product: pid });
      let result = await cartsModel.findByIdAndUpdate({ _id: cid }, cart);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProductToCart(cid, pid) {
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      if (cart) {
        const index = cart.products.findIndex(
          (product) => product._id.toString() === pid
        );
        if (index !== -1) {
          cart.products.splice(index, 1);
          await cart.save();
          return cart;
        } else {
          return "Producto no encontrado en el carrito";
        }
      } else {
        return "Carrito no encontrado.";
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProducts(cid) {
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      if (cart) {
        cart.products = [];
        await cart.save();
        return "Todos los productos del carrito fueron eliminados.";
      } else {
        return "Carrito no encontrado.";
      }
    } catch (error) {
      console.error(error);
    }
  }

  async updateQuantity({ cid, pid, quantity }) {
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      if (cart) {
        const index = cart.products.findIndex(
          (product) => product._id.toString() === pid
        );
        if (index !== -1) {
          cart.products[index].quantity = quantity;
          await cart.save();
          console.log("Cantidad del producto actualizada con éxito");
          return cart;
        } else {
          return "Producto no encontrado en el carrito";
        }
      } else {
        return "Carrito no encontrado.";
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default CartManagerMongo;
