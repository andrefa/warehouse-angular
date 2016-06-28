(function() {

    'use strict'

    describe('ProductsListCtrl Unit Tests', function() {

        var PRODUCT = {"id": 0, "face": "=)", "date" : "01/01/01", "size" : "21" , "price" : "21.2"};

        var $scope;
        var $q;
        var servicePromiseDeferred;
        var ProductsListCtrl;

        beforeEach(module('products'));

        beforeEach(inject(function($controller, _$rootScope_, _$q_, ProductsModel) {
            $q = _$q_;
            $scope = _$rootScope_;

            servicePromiseDeferred = $q.defer();

            spyOn(ProductsModel, 'getProducts').and.returnValue(servicePromiseDeferred.promise);

            ProductsListCtrl = $controller('ProductsListCtrl', {
                ProductsModel: ProductsModel
            });
        }));

        if('Should be in initial controller state', function() {
            expect(ProductsListCtrl.isFetchingProducts).toBeFalsy();
            expect(ProductsListCtrl.products).toBe([]);
            expect(ProductsListCtrl.sortBy).toBeNull();
            expect(ProductsListCtrl.reachedEnd).toBeFalsy();
            expect(ProductsListCtrl.adSeed).toBeNotNull();
            expect(ProductsListCtrl.sortOptions).toBe(['size', 'price', 'id']);
        });

        it('Should request products json and return as promise', function() {
            servicePromiseDeferred.resolve([PRODUCT]);
            $scope.$apply();

            var ctrlProducts = ProductsListCtrl.products;

            expect(ctrlProducts.length).toBe(1);
            checkProduct(ctrlProducts[0], PRODUCT);
        });

        it('Should test for ad exibition in wrong index', function() {
            expect(ProductsListCtrl.shouldDisplayAd(1)).toBeFalsy();
        });

        it('Should test for ad exibition in correct index', function() {
            expect(ProductsListCtrl.shouldDisplayAd(19)).toBeTruthy();
        });

        var checkProduct = function(prodA, prodB) {
            expect(prodA.id).toBe(prodB.id);
            expect(prodA.face).toBe(prodB.face);
            expect(prodA.date).toBe(prodB.date);
            expect(prodA.size).toBe(prodB.size);
        };

    });


})();
