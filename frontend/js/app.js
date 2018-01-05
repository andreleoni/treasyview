var app = angular.module("treasyViewApp", ['ui.tree']);

app.controller('mainController', function($scope, $http) {
  delete $http.defaults.headers.common['X-Requested-With'];

  var mc = this;
  this.query = "";

  mc.items = [];
  $http.get(base_url + '/items', { format: 'json' }).then(function(response) {
    var items = response.data;
    mc.items = this.itemsToTree(items);
  }.bind(this), function() {
    $.notify("Server not running, or an error ocurred.", "error");
  });


  this.treeviewItemCreate = function(scope) {
    var default_item_title = "New item";

    if (scope == "new") {
      $http.post(base_url + '/items?title=' + default_item_title )
        .then(function(response) {
          $.notify("Created successfully", "success");

          this.items.push({
            id: response.data.id,
            title: default_item_title,
            nodes: []
          });

        }.bind(this), function() {
          $.notify("Error on create", "error");
        });

    } else {
      var nodeData = scope.$modelValue;

      $http.post(base_url + '/items?title=' + default_item_title + '&parent_id=' + nodeData.id)
        .then(function(response) {
          $.notify("Created successfully", "success");

          nodeData.nodes.push({
            id: response.data.id,
            title: default_item_title,
            nodes: []
          });

        }.bind(this), function() {
          $.notify("Error on create", "error");
        });
    }
  }

  this.treeviewItemEdit = function(scope) {
    var scope_id = scope.$modelValue.id;
    $('.edit-item-' + scope_id).show();
  }

  this.treeviewItemConfirmEdit = function(scope, parent_id) {
    var scope_id = scope.$modelValue.id;
    $('.edit-item-' + scope_id).hide();

    var title = scope.$modelValue.title;
    var description = scope.$modelValue.description;
    var data = { title: title, description: description };

    $http.put(base_url + '/items/' + scope_id + '?title=' + title + '&description=' + description , data)
      .then(function(response) {
        $.notify("Changed successfully", "success");
      }.bind(this), function() {
        $.notify("Error on change", "error");
      });
  }

  this.treeviewItemDelete = function(scope, callback) {
    var item_id = scope.$modelValue.id;

    $http.delete(base_url + '/items/' + item_id)
      .then(function(response) {
        $.notify("Deleted successfully", "success");
        callback(scope);
      }.bind(this), function() {
        $.notify("Error on delete", "error");
      });
  }

  this.collapseAll = function() {
    $scope.$broadcast('angular-ui-tree:collapse-all');
  }

  this.expandAll = function() {
    $scope.$broadcast('angular-ui-tree:expand-all');
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
        if (items[map[node.parent_id]] != undefined) items[map[node.parent_id]].nodes.push(node);
      } else {
        tree_items.push(node);
      }
    }

    return tree_items;
  }

  this.visible = function (item) {
    return !(this.query && this.query.length > 0 &&
      item.title.indexOf(this.query) == -1);
  };
});
