(function($) {
    "use strict";

    $("body").scrollspy({
        target: ".navbar-fixed-top",
        offset: 60
    });

    $("#topNav").affix({
        offset: {
            top: 200
        }
    });
    
    new WOW().init();
    
    $("a.page-scroll").bind("click", function(event) {
        var $ele = $(this);
        var href = $ele.attr("href");

        if (/^#/.test(href)) {
	        $("html, body").stop().animate({
		        scrollTop: ($(href).offset().top - 60)
	        }, 1450, "easeInOutExpo");

	        event.preventDefault();
        }
    });
    
    $(".navbar-collapse ul li a").click(function() {
        /* always close responsive nav after click */
        $(".navbar-toggle:visible").click();
    });

    $("#galleryModal").on("show.bs.modal", function (e) {
       $("#galleryImage").attr("src",$(e.relatedTarget).data("src"));
    });

})(jQuery);