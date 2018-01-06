var app = angular.module("treasyViewApp", ['ui.tree']);

app.controller('mainController', function($scope, $http) {
  delete $http.defaults.headers.common['X-Requested-With'];

  var mc = this;
  this.query = "";

  mc.items = [];
  $http.get(base_url + '/items', { format: 'json' }).then(function(response) {
    var items = response.data;

    mc.items = this.itemsToTree(items);
    this.hideLoader();

  }.bind(this), function() {
    $.notify("Server not running, or an error ocurred.", { globalPosition: 'bottom right', className: 'error' });
  });


  this.treeviewItemCreate = function(scope) {
    var default_item_title = "New item";

    if (scope == "new") {
      $http.post(base_url + '/items?title=' + default_item_title )
        .then(function(response) {
          $.notify("Created successfully", { globalPosition: 'bottom right', className: 'success' });

          this.items.push({
            id: response.data.id,
            title: default_item_title,
            nodes: []
          });

        }.bind(this), function() {
          $.notify("Error on create", { globalPosition: 'bottom right', className: 'error' });
        });

    } else {
      var nodeData = scope.$modelValue;
      var $text_field_title = $('.item-title-edit-' + nodeData.id);

      if ($text_field_title.val() != "") {
        $http.post(base_url + '/items?title=' + default_item_title + '&parent_id=' + nodeData.id)
        .then(function(response) {
          $.notify("Created successfully", { globalPosition: 'bottom right', className: 'success' });

          nodeData.nodes.push({
            id: response.data.id,
            title: default_item_title,
            nodes: []
          });

        }.bind(this), function() {
          $.notify("Error on create", { globalPosition: 'bottom right', className: 'error' });
        });
      } else {
        this.callFillError(nodeData.id);
      }
    }
  }

  this.treeviewItemEdit = function(scope) {
    var scope_id = scope.$modelValue.id;
    $('.edit-item-' + scope_id).show();
  }

  this.treeviewItemConfirmEdit = function(scope, parent_id) {
    var scope_id = scope.$modelValue.id;

    var title = scope.$modelValue.title;
    var description = scope.$modelValue.description;
    var data = { title: title, description: description };

    if (description == undefined || description == null) description = "";

    if (title != undefined && title != "") {
      this.closeModal(scope_id);
      this.clearFillError(scope_id);

      $http.put(base_url + '/items/' + scope_id + '?title=' + title + '&description=' + description , data)
        .then(function(response) {
          $.notify("Changed successfully", { globalPosition: 'bottom right', className: 'success' });
        }.bind(this), function() {
          $.notify("Error on change", { globalPosition: 'bottom right', className: 'error' });
        });

    } else {
      this.callFillError(scope_id);
    }
  }

  this.treeviewItemDelete = function(scope, callback) {
    if (confirm("Are you sure?")) {
      var item_id = scope.$modelValue.id;

      $http.delete(base_url + '/items/' + item_id)
        .then(function(response) {
          $.notify("Deleted successfully", { globalPosition: 'bottom right', className: 'success' });
          callback(scope);
        }.bind(this), function() {
          $.notify("Error on delete", { globalPosition: 'bottom right', className: 'error' });
        });
    }
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

  this.hideLoader = function() {
    $('.loading-tree').hide();
  };

  this.callFillError = function(scope_id) {
    var $text_field_title = $('.item-title-edit-' + scope_id);
    $text_field_title.addClass('red-border');
    $text_field_title.notify("Please, fill the Title.", { position:"right middle" });
  };

  this.clearFillError = function(scope_id) {
    var $text_field_title = $('.item-title-edit-' + scope_id);
    $text_field_title.removeClass('red-border');
  };

  this.closeModal = function(scope_id) {
    $('.edit-item-' + scope_id).hide();
  };
});
