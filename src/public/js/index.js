const socket = io();

socket.on("updateProducts", (data) => {
  const productList = document.getElementById("productList");
  if (productList && Array.isArray(data.products)) {
    productList.innerHTML = "";
    const h1 = document.createElement("h1");
    h1.textContent = "Lista de productos:";
    productList.appendChild(h1);

    const products = data.products;
    if (products.length === 0) {
      const noProductsMessage = document.createElement("p");
      noProductsMessage.textContent = "No hay productos disponibles.";
      productList.appendChild(noProductsMessage);
    } else {
      products.forEach((product) => {
        const id = product._id.toString();
        const productContainer = document.createElement("div");
        const parametro = "id";
        productContainer.setAttribute(parametro, id);
        productContainer.innerHTML = ` 
          <h4>${product.code}: ${product.title}</h4>
          <p>ID de producto: ${id}</p>
          <p>${product.description} - $${product.price} - Stock: ${product.stock}</p>
          <button type="button" onclick="addToCart('{{_id}}')">Agregar al carrito</button>
          <button type="button" onclick="updateProductId('${id}','${product.code}','${product.title}','${product.description}','${product.price}','${product.thumbnail}','${product.stock}','${product.category}')">Actualizar producto</button>
          <button type="button" onclick="deleteProduct('${id}')">Eliminar producto</button>   
        `;
        productList.appendChild(productContainer);
      });
      if (data.hasPrevPage) {
        const prevPageLink = document.createElement("a");
        prevPageLink.href = `/realtimeproducts?pageQuery=${data.prevPage}`;
        prevPageLink.textContent = "Anterior";
        productList.appendChild(prevPageLink);
      }
      const label = document.createElement("label");
      label.textContent = data.page;
      productList.appendChild(label);

      if (data.hasNextPage) {
        const nextPageLink = document.createElement("a");
        nextPageLink.href = `/realtimeproducts?pageQuery=${data.nextPage}`;
        nextPageLink.textContent = "Siguiente";
        productList.appendChild(nextPageLink);
      }
    }
  } else {
    console.log("Error: La estructura de datos de 'data' no es válida.");
  }
});

function addProduct() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;

  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !thumbnail ||
    !stock ||
    !category
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Por favor, complete todos los campos.",
    });
    return;
  }

  socket.emit("addProduct", {
    title,
    description,
    code,
    price,
    thumbnail,
    stock,
    category,
  });

  clear();
}

function addToCart(_id) {
  socket.emit("addToCart", _id);
}

socket.on("exisitingCode", (data) => {
  Swal.fire({
    title: "Este producto ya existe!",
    text: `El codigo ${data.data} ya existe en el listado de productos.`,
  });
});

function clear() {
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("code").value = "";
  document.getElementById("price").value = "";
  document.getElementById("thumbnail").value = "";
  document.getElementById("stock").value = "";
  document.getElementById("category").value = "";
}

function updateProductId(
  idProduct,
  code,
  title,
  description,
  price,
  thumbnail,
  stock,
  category
) {
  Swal.fire({
    title: "¿Desea actualizar este producto?",
    text: "Esta acción no se puede deshacer.",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, actualizar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Actualizar producto",
        html: `
        <label >ID: ${idProduct}</label><br>
          <label for="updateCode">Código:</label>
          <input type="text" id="updateCode" value="${code}" required><br>
          <label for="updateTitle">Título:</label>
          <input type="text" id="updateTitle" value="${title}" required><br>
          <label for="updateDescription">Descripción:</label>
          <input type="text" id="updateDescription" value="${description}" required><br>
          <label for="updatePrice">Precio:</label>
          <input type="number" id="updatePrice" value="${price}" required><br>
          <label for="updateThumbnail">Thumbnail:</label>
          <input type="text" id="updateThumbnail" value="${thumbnail}" required><br>
          <label for="updateStock">Stock:</label>
          <input type="number" id="updateStock" value="${stock}" required><br>
          <label for="updateCategory">Categoría:</label>
          <input type="text" id="updateCategory" value="${category}" required><br>
        `,
        showCancelButton: true,
        confirmButtonText: "Actualizar",
        cancelButtonText: "Cancelar",
        preConfirm: () => {
          code = document.getElementById("updateCode").value;
          title = document.getElementById("updateTitle").value;
          description = document.getElementById("updateDescription").value;
          price = document.getElementById("updatePrice").value;
          thumbnail = document.getElementById("updateThumbnail").value;
          stock = document.getElementById("updateStock").value;
          category = document.getElementById("updateCategory").value;

          socket.emit("updateProductId", {
            idProduct,
            code,
            title,
            description,
            price,
            thumbnail,
            stock,
            category,
          });
          Swal.fire(
            "Actualizado",
            "El producto ha sido actualizado correctamente.",
            "success"
          );
        },
      });
    }
  });
}

function deleteProduct(idProduct) {
  socket.emit("deleteProduct", { idProduct });
}

socket.on("addToCartSucces", (cart) => {
  Swal.fire({
    icon: "success",
    title: "Producto agregado al carrito.",
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      popup: "custom-toast",
    },
  });
});
