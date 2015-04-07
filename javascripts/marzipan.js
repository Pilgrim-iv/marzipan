(function ($) {
  Drupal.behaviors.myToggle = {
    attach: function(context, settings) {
      $('.search-btn', context).click(function() {
        $('.search-block-custom').toggleClass('open');
        console.log('it works');
      });
    }
  };
})(jQuery);

