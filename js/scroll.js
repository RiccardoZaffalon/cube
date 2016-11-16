$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 60
                }, 1000);
                return false;
            }
        }
    });
});

var $navigationLinks = $('nav ul.nav--nav-list > li > a');
var $sections = $($("section").get().reverse());

var sectionIdTonavigationLink = {};
$sections.each(function() {
    var id = $(this).attr('id');
    sectionIdTonavigationLink[id] = $('nav ul.nav--nav-list > li > a[href="#' + id + '"]');
});

function throttle(fn, interval) {
    var lastCall, timeoutId;
    return function () {
        var now = new Date().getTime();
        if (lastCall && now < (lastCall + interval) ) {
          
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                lastCall = now;
                fn.call();
            }, interval - (now - lastCall) );
        } else {
          
            lastCall = now;
            fn.call();
        }
    };
}

function highlightNavigation() {
  
    var scrollPosition = $(window).scrollTop();
  
    $sections.each(function() {
        var currentSection = $(this);
      
        var sectionTop = currentSection.offset().top - 120;
      
        if (scrollPosition >= sectionTop) {
          
            var id = currentSection.attr('id');
          
            var $navigationLink = sectionIdTonavigationLink[id];
          
            if (!$navigationLink.hasClass('active')) {
              
                $navigationLinks.removeClass('active');
              
                $navigationLink.addClass('active');
            }
          
            return false;
        }
    });
}

$(window).scroll( throttle(highlightNavigation,100) );

$(function() {
    var scrolled = $(document).scrollTop();

    if (scrolled > 59) {
        $('#header').addClass('is-scrolled');
    } else {
        $('#header').removeClass('is-scrolled');
    }

    $(document).scroll(function() {

        scrolled = $(document).scrollTop();

        if (scrolled > 59) {
            $('#header').addClass('is-scrolled');
        } else {
            $('#header').removeClass('is-scrolled');
        }
    })
})
