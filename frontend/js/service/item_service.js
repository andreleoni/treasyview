app.factory('itemService', function() {
  return {
    itemsToTree: function(items) {
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
    },

    notFiltering: function(query) {
      return (!(query && query.length > 0));
    },

    isVisible: function(query, item) {
      return (JSON.stringify(item).indexOf(query) > 0);
    }
  }
});
