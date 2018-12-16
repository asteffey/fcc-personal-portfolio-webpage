$(function () {
    on_resize();
    $(window).resize(on_resize);
    $(window).resize(on_scroll);

    on_scroll();
    $(window).on("scroll", on_scroll);

    $("#nav-button").click(function (e) {
        $("#nav").toggleClass("nav-visible");
    });

    $("#nav a").click(on_nav_click);
});

function on_nav_click(e) {
    $("#nav").removeClass("nav-visible");
}

function on_resize() {
    if ($("#nav-button").is(":hidden")) {
        $("#nav").removeClass("nav-visible");
    }
}

function on_scroll() {
    var currentPos = $(window).scrollTop();
    $('#nav a').each(function () {
        var sectionLink = $(this);
        // capture the height of the navbar
        var section = $(sectionLink.attr('href'));

        // subtract the navbar height from the top of the section
        if (Math.round(section.offset().top) <= currentPos && currentPos < Math.round(section.offset().top + section.outerHeight())) {
            //$('.nav li').removeClass('active');
            sectionLink.addClass('active');
        } else {
            sectionLink.removeClass('active');
        }
    });
}