(function(){

    'use strict'

    angular.module('products', ['warehouse.models.products', 'warehouse.filters.relativeDate'])
		   .controller('ProductsListCtrl', ProductsListCtrl);

    ProductsListCtrl.$inject = ['ProductsModel'];
	function ProductsListCtrl(ProductsModel) {

        const PAGE_SIZE = 20;
        const SORT_OPTIONS = ['price', 'size','id'];

        var vm = this;

        var clear = function() {
            vm.isFetchingProducts = false;
            vm.products = [];
            vm.sortBy = null;
            vm.reachedEnd = false;
            vm.adSeed = Math.floor( Math.random() * 1000 );
        };

        var fetchProducts = function() {
            if (!vm.reachedEnd) {
                vm.isFetchingProducts = true;

                ProductsModel.getProducts(PAGE_SIZE, vm.products.length, vm.sortBy)
                    .then(fetchSuccess, fetchFail);
            }
        };

        var fetchSuccess = function(products) {
            if (products.length === 0) {
                vm.reachedEnd = true;
            } else {
                vm.products = vm.products.concat(products);
            }

            vm.isFetchingProducts = false;
        };

        var fetchFail = function(error) {
            console.log('Something whent wrong..', error);
            vm.isFetchingProducts = false;
        };

        var shouldDisplayAd = function(index) {
            return (index > 0) && ((index+1) % PAGE_SIZE === 0);
        };

        var toggleSort = function(sortBy) {
            clear();
            vm.sortBy = sortBy;
            fetchProducts();
        };

        var buildAdUrl = function(index) {
            return '/ad/?r=' + (vm.adSeed + index);
        };

        vm.fetchProducts = fetchProducts;
        vm.shouldDisplayAd  = shouldDisplayAd;
        vm.toggleSort  = toggleSort;
        vm.buildAdUrl = buildAdUrl;
        vm.sortOptions = SORT_OPTIONS;

        clear();
        fetchProducts();

    };

})();
