app.controller('itemController', function($scope, $http, itemService, itemHelper) {
  var mc = this;

  mc.query = "";

  $http.get(base_url + '/items', { format: 'json' }).then(function(response) {
    var items = response.data;
    mc.items = itemService.itemsToTree(items);
    itemHelper.hideLoader();

  }.bind(this), function() {
    $.notify("Server not running, or an error ocurred.", { globalPosition: 'bottom right', className: 'error' });
  });

  this.treeviewItemCreate = function(scope) {
    var default_item_title = "New item";

    $http.post(base_url + '/items?title=' + default_item_title )
      .then(function(response) {
        $.notify("Created successfully", { globalPosition: 'bottom right', className: 'success' });

        this.items.push({
          id: response.data.id,
          title: default_item_title,
          nodes: []
        });

        itemHelper.showTooltip(response.data.id);
      }.bind(this), function() {
        $.notify("Error on create", { globalPosition: 'bottom right', className: 'error' });
      });
  }

  this.treeviewItemCreateChild = function(scope) {
    var default_item_title = "New item";

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

        itemHelper.showTooltip(response.data.id);
      }.bind(this), function() {
        $.notify("Error on create", { globalPosition: 'bottom right', className: 'error' });
      });

    } else {
      itemHelper.callFillError(nodeData.id);
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
      itemHelper.closeModal(scope_id);
      itemHelper.clearFillError(scope_id);

      $http.put(base_url + '/items/' + scope_id + '?title=' + title + '&description=' + description , data)
        .then(function(response) {
          $.notify("Changed successfully", { globalPosition: 'bottom right', className: 'success' });
        }.bind(this), function() {
          $.notify("Error on change", { globalPosition: 'bottom right', className: 'error' });
        });

    } else {
      itemHelper.callFillError(scope_id);
    }
  }

  this.treeviewItemDelete = function(scope, callback) {
    if (confirm("Are you sure?")) {
      var item = scope.$modelValue;
      var item_id = item.id;

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

  this.visible = function (item) {
    var is_visible = true;

    if (itemService.notFiltering(this.query)) return true;

    return (itemService.isVisible(this.query, item));
  };
});
