var app = angular.module("treasyViewApp", ['ui.tree']);

app.controller('mainController', function($http) {
  delete $http.defaults.headers.common['X-Requested-With'];

  var mc = this;
  this.query = "";

  mc.items = [];
  $http.get(base_url + '/items', { format: 'json' }).then(function(response) {
    var items = response.data;
    mc.items = this.itemsToTree(items);
    console.log(mc.items)
  }.bind(this));


  this.treeviewItemCreate = function(scope) {
    if (scope == "new") {
      this.items.push({
        id: 200,
        title: "Novo",
        nodes: []
      })

    } else {
      var nodeData = scope.$modelValue;
      nodeData.nodes.push({
        id: nodeData.id * 10 + nodeData.nodes.length,
        title: nodeData.title + '.' + (nodeData.nodes.length + 1),
        nodes: []
      });
    }
  }

  this.treeviewItemEdit = function(scope) {
    var scope_id = scope.$modelValue.id;
    $('.item-edit-' + scope_id).show();
    $('.actions-item-' + scope_id).hide();
    $('.confirm-edit-' + scope_id).show();
    $('.item-title-' + scope_id).hide();

  }

  this.treeviewItemConfirmEdit = function(scope) {
    var scope_id = scope.$modelValue.id;
    $('.item-edit-' + scope_id).hide();
    $('.actions-item-' + scope_id).show();
    $('.confirm-edit-' + scope_id).hide();
    $('.item-title-' + scope_id).show();
  }

  this.treeviewItemDelete = function(scope) {
    remove(scope);
  }

  this.collapseAll = function() {
    this.$broadcast('angular-ui-tree:collapse-all');
  }

  this.expandAll = function() {
    this.$broadcast('angular-ui-tree:expand-all');
  }

  this.itemsToTree = function(items) {
    var map = {};
    var node;
    var tree_items = [];
    var i;

    for (i = 0; i < items.length; i += 1) {
      map[items[i].id] = i;
      items[i].nodes = [];
    }

    for (i = 0; i < items.length; i += 1) {
      node = items[i];

      if (node.parent_id !== 0) {
        items[map[node.parent_id]].nodes.push(node);
      } else {
        tree_items.push(node);
      }
    }

    return tree_items;
  }

  this.visible = function (item) {
    return !(this.query && this.query.length > 0 && item.title.indexOf(this.query) == -1);
  };
});
