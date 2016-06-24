(function(){

    'use strict'

    angular.module('products', [])
		   .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['$http'];
	function ProductsController($http) {

        var vm = this;

        var initialize = function() {
            vm.isFetchingProducts = false;
            vm.products = [];

            vm.fetchProducts();
        };

        var fetchProducts = function() {

            vm.isFetchingProducts = true;

            $http.get(buildRequestUrl(),{
                transformResponse : parseJsonResponseToArray
            })
                .then(function(response) {
                    vm.products = vm.products.concat(response.data);
                    vm.isFetchingProducts = false;
                }, function(response) {
                    alert(response);
                    vm.isFetchingProducts = false;
                });
        };

        var buildRequestUrl = function() {
            return '/api/products?limit=20&skip=' + vm.products.length;
        };

        var parseJsonResponseToArray = function(response) {
            var normalized = String(response).trim().replace(new RegExp('\n', 'g'),',');
            var arrStr = '[' + normalized + ']';

            return JSON.parse(arrStr);
        };

        var shouldDisplayAd = function(index) {
            return (index > 0) && ((index+1) % 20 === 0);
        };

        vm.fetchProducts = fetchProducts;
        vm.shouldDisplayAd  = shouldDisplayAd;

        initialize();

    };

})();
