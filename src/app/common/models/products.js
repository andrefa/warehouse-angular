(function(){

    'use strict';

    angular.module('warehouse.models.products', [])
		   .service('ProductsModel', ProductsModel);

    ProductsModel.$inject = ['$http', '$q'];
    function ProductsModel($http, $q) {

        var model = this;
        var URL = '/api/products';

        function extract(result) {
            return result.data;
        }

        var parseJsonResponseToArray = function(response) {
            var normalized = String(response).trim().replace( /\n/g , ',');
            var arrStr = '[' + normalized + ']';

            return JSON.parse(arrStr);
        };

        model.getProducts = function(limit, skip, sort) {
            return $http.get(URL, {
                transformResponse : parseJsonResponseToArray,
                params : {
                    limit : limit,
                    skip : skip,
                    sort : sort
                }
            }).then(extract);
        };

    }

})();
