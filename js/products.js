let products = [];

async function fetchProducts() {
  await fetch("../json/products.json")
    .then((response) => {
      if (!response.ok)
        throw new Error("Error al realizar la solicitud:", response.status);
      else return response.json();
    })
    .then((data) => {
      products = data.items;
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
}

async function renderProducts() {
  await fetchProducts();
  products.forEach(async function (product) {
    let item = document.createElement("div");
    let images = await fetchProductImages(product.name);
    item.classList.add("list-group-item", "w-100");
    item.innerHTML = `<div class="row align-items-center">
              <div class="col-md-3">
                <img
                  src="${images[0].contentUrl}"
                  alt="Product Image"
                  class="img-fluid"
                />
              </div>
              <div class="col-md-6">
                <h5 class="mb-1">${product.name}</h5>
                <p class="mb-1">${product.description}</p>
                <p class="mb-1">Price: $${product.price}</p>
              </div>
              <div class="col-md-3">
                <button type="button" class="btn btn-primary">
                  Add to Cart
                </button>
              </div>
            </div>`;
    document.querySelector("#products-list").appendChild(item);
  });
}
document.addEventListener("DOMContentLoaded", renderProducts());
