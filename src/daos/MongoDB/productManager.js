import productsModel from "../models/products.models.js";

class ProductManagerMongo {
  async getProducts(limit = 10, pageQuery = 1, query, sort) {
    try {
      let filter = { isActive: true };

      if (query) {
        const queryParts = query.split(":");
        if (queryParts.length === 2) {
          const [field, value] = queryParts;
          filter[field] = value;
        } else {
          console.error("Formato de consulta no válido:", query);
        }
      }
      const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, page } =
        await productsModel.paginate(filter, {
          limit,
          page: pageQuery,
          sort: { price: sort === "asc" ? 1 : -1 },
          lean: true,
        });
      return {
        status: "success",
        payload: docs,
        totalPages: Math.ceil(docs.length / limit),
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage
          ? `/realtimeproducts?pageQuery=${prevPage}`
          : null,
        nextLink: hasNextPage
          ? `/realtimeproducts?pageQuery=${nextPage}`
          : null,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async getProductById(pid) {
    try {
      return await productsModel.findOne({ _id: pid });
    } catch (error) {
      console.error(error);
    }
  }

  async updateProduct(data) {
    try {
      return await productsModel.findByIdAndUpdate(
        { _id: data.idProduct },
        {
          code: data.code,
          title: data.title,
          description: data.description,
          price: data.price,
          thumbnail: data.thumbnail,
          stock: data.stock,
          category: data.category,
          page: data.page,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async createproduct(newProduct) {
    try {
      return await productsModel.create(newProduct);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(pid) {
    try {
      return await productsModel.findByIdAndUpdate(
        { _id: pid },
        { isActive: false }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getProductCode(code) {
    return await productsModel.findOne({ code });
  }
}

export default ProductManagerMongo;
