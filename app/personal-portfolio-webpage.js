$(function () {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('fcc-test') === 'true') {
        $("#name").addClass("with-fcc-test");
        $("#navbar").addClass("with-fcc-test");
    }

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


    let currentPos = $(window).scrollTop();
    
    // curBottom and prevBottom are scroll positions of bottom of section divs
    // Subtract positions by -1 to provide buffer when currentPos is actually 
    // a fraction of a pixel into previous section due to rounding errors
   
    let prevBottom = -1;
    $('#nav a').each(function () {
        var sectionLink = $(this);
        // capture the height of the navbar
        var section = $(sectionLink.attr('href'));

        var curBottom = (section.offset().top + section.outerHeight() - 1);
        if (prevBottom < currentPos && currentPos < curBottom) {
            sectionLink.addClass('active');
        } else {
            sectionLink.removeClass('active');
        }
        prevBottom = curBottom;
    });
}