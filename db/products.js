module.exports = (function() {
  let products = [{ name: 'test', price: 23, inventory: 2, id: 0 }];
  let uniqueID = 1;
  return {
    get: getProduct,
    getByName: getProductByName,
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
  function getProductByName(name) {
    let product = products.find(function(elem) {
      return elem.name === name;
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

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        product[key] = data[key];
      }
    }
  }
  function deleteProduct(id) {
    let prodIndex = null;
    let product = products.find(function(elem, index) {
      if (elem.id === id) {
        prodIndex = index;
        return true;
      }
      return false;
    });
    return products.splice(prodIndex, 1);
  }
})();
