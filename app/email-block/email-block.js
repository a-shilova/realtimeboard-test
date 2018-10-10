(function(angular) {
angular.module('emailEditorApp')
    .directive('emailBlock', ['$location', '$anchorScroll', function($location, $anchorScroll) {
        return {
            restrict: 'EA',
            templateUrl : 'email-block/email-block.html',
            controllerAs : 'ctrl',
            transclude: true,
            bindToController: true,
            link: function(scope, element, attrs) {
                $location.hash(attrs.id);
                $anchorScroll();
            }
        }
    }]);})(window.angular);

