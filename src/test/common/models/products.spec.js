(function() {

    'use strict'

    describe('ProductsModel Service Unit Tests', function() {

        var PRODUCT = { "id": 0, "face": "Development", "date" : "", "size" : "21" };

        beforeEach(module('warehouse.models.products'));

        var ProductsModel;
        var httpBackend;
        
        beforeEach(inject(function(_ProductsModel_, $httpBackend){
            ProductsModel = _ProductsModel_;
            httpBackend = $httpBackend;
        }));

        afterEach(function(){
            httpBackend.flush();
        });

        it('Should request products json without parameters and return as promise', function() {

            httpBackend.when('GET', '/api/products').respond(JSON.stringify(PRODUCT));

            ProductsModel.getProducts().then(function(response) {
                expect(response.length).toBe(1);

                checkProduct(response[0], PRODUCT);
            });
        });

        it('Should request products json without with parameters and return as promise', function() {

            httpBackend.when('GET', '/api/products?limit=1&skip=1&sort=1').respond(JSON.stringify(PRODUCT));

            ProductsModel.getProducts(1,1,1).then(function(response) {
                expect(response.length).toBe(1);

                checkProduct(response[0], PRODUCT);
            });
        });

        it('Should request products json without with multiple results', function() {

            var jsonResponse = JSON.stringify(PRODUCT) + '\n' + JSON.stringify(PRODUCT);
            httpBackend.when('GET', '/api/products').respond(jsonResponse);

            ProductsModel.getProducts().then(function(response) {
                expect(response.length).toBe(2);

                checkProduct(response[0], PRODUCT);
                checkProduct(response[1], PRODUCT);
            });
        });

        var checkProduct = function(prodA, prodB) {
            expect(prodA.id).toBe(prodB.id);
            expect(prodA.face).toBe(prodB.face);
            expect(prodA.date).toBe(prodB.date);
            expect(prodA.size).toBe(prodB.size);
        };

    });

})();
