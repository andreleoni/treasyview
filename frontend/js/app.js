var app = angular.module("treasyViewApp", []);

app.controller('mainController', function($http) {
  // var mc = this;
  // $http.get('https://jsonplaceholder.typicode.com/posts', {}).then(function(response) {
  //   mc.posts = response.data;
  // })

  this.items = [
    {
      id: 1,
      title: "Pasta 1",
      parent_id: undefined,
      collapsed: false
    },
    {
      id: 2,
      title: "Pasta 2",
      parent_id: 1,
      collapsed: false
    },
    {
      id: 3,
      title: "Pasta 3",
      parent_id: 1,
      collapsed: true,
    },
    {
      id: 4,
      title: "Pasta 4",
      parent_id: 3,
      collapsed: true
    },
    {
      id: 5,
      title: "Pasta 1",
      parent_id: undefined,
      collapsed: true
    },
    {
      id: 6,
      title: "Pasta 6",
      parent_id: 2,
      collapsed: true
    }
  ]

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
    var items = this.items;
    var parents = [];

    if (isNaN(item.parent_id)) {
      return parents;
    } else {
      var parent_id = item.parent_id;

      do {
        for(current_item in items) {
          var have_a_parent_id = false;

          if (parent_id == items[current_item].id) {
            have_a_parent_id = true;
            parents.push(parent_id);
            parent_id = items[current_item].parent_id;
            break;
          }
        }
      } while (have_a_parent_id != false);
    }

    return parents.reverse();
  }
});
