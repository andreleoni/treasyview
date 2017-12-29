var app = angular.module("treasyViewApp", ['ui.tree']);

app.controller('mainController', function($http) {
  delete $http.defaults.headers.common['X-Requested-With'];

  var mc = this;
  this.query = "";

  mc.items = [];
  this.items = [
    {
      "id": 1,
      "title": "node1",
      "nodes": [
        {
          "id": 11,
          "title": "node1.1",
          "nodes": [
            {
              "id": 111,
              "title": "node1.1.1",
              "nodes": []
            }
          ]
        },
        {
          "id": 12,
          "title": "node1.2",
          "nodes": []
        }
      ]
    },
    {
      "id": 2,
      "title": "node2",
      "nodrop": true,
      "nodes": [
        {
          "id": 21,
          "title": "node2.1",
          "nodes": []
        },
        {
          "id": 22,
          "title": "node2.2",
          "nodes": []
        }
      ]
    },
    {
      "id": 3,
      "title": "node3",
      "nodes": [
        {
          "id": 31,
          "title": "node3.1",
          "nodes": []
        }
      ]
    }
  ]

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

  this.getTreeviewFathers = function(item) {
    var items = mc.items;
    var parents = [];
    var have_a_parent_id;
    var parent_id;
    var counter = 0;

    parent_id = item.parent_id;

    if (isNaN(parent_id) || parent_id == null) {
      return parents;
    } else {
      do {
        counter = counter + 1;

        for(current_item in items) {
          have_a_parent_id = false;

          if (parent_id == items[current_item].id) {
            have_a_parent_id = true;

            if (parents.indexOf(parent_id) == -1) {
              parents.push(parent_id);
              parent_id = items[current_item].parent_id;
            } else {
              parent_id = undefined;
            }

            break;
          }
        }

        if (items.length <= counter) have_a_parent_id = false;
      } while (have_a_parent_id != false);
    }

    return parents.reverse();
  }

  this.visible = function (item) {
    return !(this.query && this.query.length > 0 && item.title.indexOf(this.query) == -1);
  };
});
