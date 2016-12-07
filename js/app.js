(function(){

var storeApp = angular.module('AngularStore', ['ngRoute']);
  storeApp.config(function($routeProvider) {
       $routeProvider

       // route
            .when('/products', {
              templateUrl: 'partials/products.html',
              controller: 'storeController'
            }).
            when('/products/:productId', {
              templateUrl: 'partials/product.html',
              controller: 'productController'
            }).
            when('/cart', {
              templateUrl: 'partials/shoppingCart.html',
              controller: 'storeController'
            }).
            otherwise({
              redirectTo: '/products'
            });
});



storeApp.controller('storeController', function($scope, $routeParams, Myservice,  $filter) {

    // get store and cart from service
    $scope.cart = Myservice.cart;
    $scope.products = [];
  //  $scope.name = $routeParams.productId;

    Myservice.getdata().success(function (data){

     $scope.products=data;
      });



/*
Myservice.getdata().success(function (data){
  $scope.products = data.filter(function(entry){
    return entry.id == $scope.name;
  })[0];
  console.log($routeParams);
  //  $scope.products=data;
  });
*/

});



storeApp.controller('productController', function ($scope, $routeParams, $http, Myservice){
         $scope.name = $routeParams.productId;

         $scope.cart = Myservice.cart;

         Myservice.getdata().success(function (data){
           $scope.product = data.filter(function(entry){
             return entry.id == $scope.name;
           })[0];
           console.log($routeParams);
         });
 });


// create a data service that provides a store and a shopping cart that
// will be shared by all views (instead of creating fresh ones for each view).
storeApp.factory('Myservice', function($http){

var myCart = new shoppingCart('AngularStore');
//myCart.addCheckoutParameters("PayPal", "bernardo.castilho-facilitator@gmail.com");

// enable Google Wallet checkout
// note: the second parameter identifies the merchant; in order to use the
// shopping cart with Google Wallet, you have to create a merchant account with
// Google. You can do that here:
// https://developers.google.com/commerce/wallet/digital/training/getting-started/merchant-setup
/*
myCart.addCheckoutParameters("Google", "500640663394527",
    {
        ship_method_name_1: "UPS Next Day Air",
        ship_method_price_1: "20.00",
        ship_method_currency_1: "USD",
        ship_method_name_2: "UPS Ground",
        ship_method_price_2: "15.00",
        ship_method_currency_2: "USD"
    }
);
*/

    return {
        cart: myCart,
        getdata: function(){
              //gets the data either thru file or api
              return $http.get('data/sample.json');
        }

    };


});



})();
