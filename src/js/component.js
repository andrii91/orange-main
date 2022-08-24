
(function ($, window, undefined) {
  $.fn.bouncing = function (options) {
    var settings = $.extend({
      horizontal: true,
      vertical: true,
      speed: 100, // In pixels per second
      container: $(this).parent(),
      bumpEdge: function () {}
    }, options);

    return this.each(function () {
      var containerWidth, containerHeight, elWidth, elHeight, move, getSizes,
        $el = $(this);

      getSizes = function () {
        containerWidth = settings.container.outerWidth();
        containerHeight = settings.container.outerHeight();
        elWidth = $el.outerWidth();
        elHeight = $el.outerHeight();
      };

      move = {
        right: function () {
          $el.animate({
            left: (containerWidth - elWidth)
          }, {
            duration: ((containerWidth / settings.speed) * 1000),
            queue: false,
            easing: "linear",
            complete: function () {
              settings.bumpEdge();
              move.left();
            }
          });
        },
        left: function () {
          $el.animate({
            left: 0
          }, {
            duration: ((containerWidth / settings.speed) * 1000),
            queue: false,
            easing: "linear",
            complete: function () {
              settings.bumpEdge();
              move.right();
            }
          });
        },
        down: function () {
          $el.animate({
            top: (containerHeight - elHeight)
          }, {
            duration: ((containerHeight / settings.speed) * 1000),
            queue: false,
            easing: "linear",
            complete: function () {
              settings.bumpEdge();
              move.up();
            }
          });
        },
        up: function () {
          $el.animate({
            top: 0
          }, {
            duration: ((containerHeight / settings.speed) * 1000),
            queue: false,
            easing: "linear",
            complete: function () {
              settings.bumpEdge();
              move.down();
            }
          });
        }
      };

      getSizes();

      if (settings.horizontal) {
        move.right();
      }
      if (settings.vertical) {
        move.down();
      }

      // Make that shit responsive!
      $(window).resize(function () {
        getSizes();
      });
    });
  };
})(jQuery, window);



$(document).ready(function() { 
  
    function invertColor(hexTripletColor) {
        var color = hexTripletColor;
        color = color.substring(1); // remove #
        color = parseInt(color, 16); // convert to integer
        color = 0xFFFFFF ^ color; // invert three bytes
        color = color.toString(16); // convert to hex
        color = ("000000" + color).slice(-6); // pad with leading zeros
        color = "#" + color; // prepend #
        return color;
    }
  
  if($('body').hasClass('home')) {
      $('.section').viewportChecker({
    classToAdd: 'visible', // Class to add to the elements when they are visible,
    classToAddForFullView: 'full-visible', // Class to add when an item is completely visible in the viewport
      repeat: true, // Add the possibility to remove the class if the elements are not visible
      offset: '0%',
      callbackFunction: function (elem, action) {

        $('.home, .nav:not(.is-mob)').css({
          'background': elem.attr('data-color')
        })
        
        $('.invert-color:not(.is-mob), .h2').css('color',invertColor(elem.attr('data-color')))
        
      }
    });
  }
  
  $(window).resize(function(){
    if($(this).width() < 1155){
      $('.invert-color, .nav').addClass('is-mob')
    }else{
      $('.invert-color, .nav').removeClass('is-mob')
    }
  })
  
    if($(this).width() < 1155){
      $('.invert-color, .nav').addClass('is-mob')
    }else{
      $('.invert-color, .nav').removeClass('is-mob')
    }
  
  $('.mob-btn').click(function(){
    $('nav').toggleClass('show')
  })
}); 
   
$(document).ready(function () {

  var newColor = [
    '#A29EA1',
    '#E2F7F2',
    '#D4EB7E',
    '#D9A993',
    '#EDA89E',
    '#CDF4CE',
    '#638E81',
    '#7171A4',
    '#99E9A0',
    '#A6A3E8',
    '#FFFFFF'
  ],
        
  newColorCount = 0;
  

  $('.bouncing-animation').bouncing({
    speed: 300,
    bumpEdge: function () {
//      var newColor = "hsl(" + Math.floor(Math.random() * 360) + ", 100%, 50%)";
      $('.bouncing-animation .logo-color').css('fill', newColor[newColorCount]);
      newColorCount++;
      
      if(newColorCount > newColor.length) {
        newColorCount = 0;
      }
    }
  });
  
});