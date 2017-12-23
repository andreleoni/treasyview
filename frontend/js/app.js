var app = angular.module("treasyViewApp", []);

app.controller('mainController', function($http) {
  var mc = this;
  mc.items = [];

  $http.get('http://localhost:3000/items', { format: 'json' }).then(function(response) {
    var items = response.data;
    mc.items = response.data;

    items.map(function(item, key) {
      items[key].parents = mc.getTreeviewFathers(item);
    });

    mc.items = items;
  });

  this.treeviewItemCreate = function() {
    alert("create_new");
  }

  this.treeviewItemEdit = function() {
    alert("edit");
  }

  this.treeviewItemDelete = function() {
    alert("delete");
  }

  this.treeviewItemCollapseAll = function() {
    alert("collapseall");
  }

  this.treeviewItemExpandAll = function() {
    alert("expandall");
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
});
