var app = angular.module("treasyViewApp", ['ui.tree'], function($rootScopeProvider) {
  $rootScopeProvider.digestTtl(30);
});

$(document).ready(function() {
  $('.tooltip').tooltipster({ side: 'right' });
});
