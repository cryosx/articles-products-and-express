module.exports = (function() {
  let products = [{ name: 'test', price: 23, inventory: 2, id: 0 }];
  let uniqueID = 1;
  return {
    get: getProduct,
    getAll: getAllProducts,
    create: createProduct,
    update: updateProduct,
    delete: deleteProduct
  };
  function getProduct(id) {
    let product = products.find(function(elem) {
      return elem.id === id;
    });
    return product;
  }
  function getAllProducts() {
    return products;
  }
  function createProduct(data) {
    let product = {
      name: data.name,
      price: data.price,
      inventory: data.inventory,
      id: uniqueID++
    };
    products.push(product);
  }
  function updateProduct(id, data) {
    let product = getProduct(id);
    console.log('put', product);
    console.log('put', data);

    for (const key in product) {
      if (object.hasOwnProperty(key)) {
        product[key] = data[key];
      }
    }
  }
  function deleteProduct() {}
})();
