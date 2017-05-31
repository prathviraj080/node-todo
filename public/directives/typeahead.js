var todoApp = angular.module('todo');
todoApp.directive('typeahead', function($timeout){
    return {
        restrict: 'E',
        scope: {
            items: '=',
            prompt: '@',
            name: '@',
            onSelect: '&'
        },
        link: function(scope,elem, attrs) {
            scope.id = '';
            scope.handleSelection = function(selectedItem) {
                scope.model = selectedItem;
                scope.current = 0;
                scope.selected = true;
                $timeout(function() {
                scope.onSelect({param:scope.model});
                }, 200);
            };
            scope.exceptionCase = function() {
                var action = true;
                if(!scope.items.length)return;
                scope.items.forEach(function(element) {
                    if(scope.model == element.name)
                        action = false;
                }, this);
                if(action==false) return;
                if(scope.lastName == scope.model) return;
                scope.onSelect({param:scope.model?'badData':''});
            };
            scope.current = 0;
            scope.selected = true; // hides the list initially
            scope.isCurrent = function(index) {
                return scope.current == index;
            };
            scope.setCurrent = function(index) {
                scope.current = index;
            };
        },
        templateUrl: '../templates/lookahead.html'
    };
});