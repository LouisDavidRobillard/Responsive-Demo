(function () {
    'use strict';

    angular
        .module('app.responsiveWidget')
        .component('ldResponsiveWidget', responsiveWidget());

    function responsiveWidget() {
        var component = {
            bindings: {
            },
            controller: ResponsiveWidgetController,
            templateUrl: 'app/feature/responsiveWidget/responsiveWidget.html'
        }
        return component;
    };

    ResponsiveWidgetController.$inject = ['$interval'];

    function ResponsiveWidgetController($interval) {
        var ctrl = this;
        const DELAY = 3000,
            CLASSES = ['desktop', 'tablette', 'mobile'];
        var currentClassesIndex = 0,
            interval;

        ctrl.activeClass = "";
        ctrl.playPause = playPauseInterval;
        ctrl.playPauseClass = playPauseClass;

        // Life Cycle events
        ctrl.$onInit = function () {
            ctrl.activeClass = CLASSES[currentClassesIndex];
            interval = $interval(changeClass, DELAY);

        }
        ctrl.$onDestroy = function () {
            if (angular.isDefined(interval)) {
                $interval.cancel(interval);
                interval = undefined;
            }
        }

        // Functions
        function changeClass() {
            currentClassesIndex++;
            if (currentClassesIndex >= CLASSES.length)
                currentClassesIndex = 0;
            ctrl.activeClass = CLASSES[currentClassesIndex];
        }

        function playPauseInterval() {
            if (angular.isDefined(interval)) {
                $interval.cancel(interval);
                interval = undefined;
            } else {
                interval = $interval(changeClass, DELAY);
            }
        }
        function playPauseClass(){
            return angular.isDefined(interval) ? 'Pause': 'Play';
        }
    }

})();