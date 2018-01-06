app.factory('itemHelper', function() {
  return {
    hideLoader: function() {
      $('.loading-tree').hide();
    },

    callFillError: function(scope_id) {
      var $text_field_title = $('.item-title-edit-' + scope_id);
      $text_field_title.addClass('red-border');
      $text_field_title.notify("Please, fill the Title.", { position:"right middle" });
    },

    clearFillError: function(scope_id) {
      var $text_field_title = $('.item-title-edit-' + scope_id);
      $text_field_title.removeClass('red-border');
    },

    closeModal: function(scope_id) {
      $('.edit-item-' + scope_id).hide();
    },

    showTooltip: function(scope_id) {
      setTimeout(function() {
        $('.item-title-' + scope_id).tooltipster({ side: 'right' });
      }, 1);
    }
  }
});
