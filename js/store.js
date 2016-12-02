//----------------------------------------------------------------
// store (contains the products)
//
function store($http, $q, route) {

    var productsDeferred = $q.defer();
    this.products = productsDeferred.promise;

    $http.get(route).success(function (data) {
        var products = [];

        for (var i = 0, len = data.length; i < len; i++) {
            var prod = data[i];
            products.push(prod);
          //  console.log(products);
        }

        productsDeferred.resolve(products);
    });
  //  console.log(this.products);

}
 store.prototype.getProduct = function (id) {

   return this.products.then(function(products) {
           for (var i = 0; i < products.length; i++) {
               if (products[i].id == id)
                   return products[i];
           }
           return null;
       });
     }

store.prototype.getProducts = function()
     {
       return this.products;
     }
