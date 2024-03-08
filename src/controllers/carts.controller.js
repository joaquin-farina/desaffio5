import CartManagerMongo from "../daos/MongoDB/cartManager.js";

class CartController {
    constructor() {
        this.service = new CartManagerMongo
    }

    getCart = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await this.service.getCart({ _id: cid });
            const products = cart.products.map((item) => {
                const productDetails = item.product;
                return {
                    _id: productDetails._id.toString(),
                    title: productDetails.title,
                    description: productDetails.description,
                    price: productDetails.price,
                };
            });

            res.render("carts", {
                status: "succes",
                payload: products,
                style: "index.css",
            });
        } catch (error) {
            res.status(500).send(`Error de servidor get. ${error.message}`);
        }
    }

    createCart = async (req, res) => {
        try {
            const result = await this.service.createCart();
            res.send({
                status: "succes",
                payload: result,
            });
        } catch (error) {
            res.status(500).send(`Error de servidor. ${error.message}`);
        }
    }

    addProductToCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const result = await this.service.addProductToCart(cid, pid);
            res.send({
                status: "succes",
                payload: result,
            });
        } catch (error) {
            res.status(500).send(`Error de servidor. ${error.message}`);
        }
    }

    updateQuantity = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;

            const cart = await this.service.updateQuantity({ cid, pid, quantity });
            res.send({
                status: "succes",
                payload: cart,
            });
        } catch (error) {
            console.error("Error al intentar actualizar el producto:", error);
            res.status(500).json({
                error: "Error interno del servidor al actualizar el producto.",
            });
        }
    }

    deleteProducts = async (req, res) => {
        const { cid } = req.params;
        const cart = await this.service.deleteProducts({ _id: cid });
        res.send({
            status: "succes",
            payload: cart,
        });
    }

    deleteProductToCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const cart = await this.service.deleteProductToCart(cid, pid);
            res.send({
                status: "succes",
                payload: cart,
            });
        } catch (error) {
            res.status(500).send(`Error de servidor. ${error.message}`);
        }
    }
}

export default CartController