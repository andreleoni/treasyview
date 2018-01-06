var app = angular.module("treasyViewApp", ['ui.tree'], function($rootScopeProvider) {
  $rootScopeProvider.digestTtl(30);
});
