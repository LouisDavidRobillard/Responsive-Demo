(function () {
    'use strict';

    angular
        .module('app.feature')
        .component('myFeature', feature());

    function feature() {
        var component = {
            bindings: {
            },
            controller: FeatureController,
            templateUrl: 'app/feature/feature/feature.html'
        }
        return component;
    };

    FeatureController.$inject = [];

    function FeatureController() {
        var ctrl = this;
    }
})();