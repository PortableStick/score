$(document).ready(() => {
    $('.dropdown-button').dropdown();
    $('.button-collapse').sideNav();

    const $coverflow = $('.coverflow');
    if ($coverflow) {
        $coverflow.on('init', () => {
            $('.display').removeClass('hidden');
        });
        $coverflow.slick({
            slidesToShow: 1,
            dots: true,
            autoplay: true,
            autoplaySpeed: 3000,
            prevArrow: $('#prev-button').html(),
            nextArrow: $('#next-button').html(),
            responsive: [{
                breakpoint: 768,
                settings: {
                    dots: false
                }
            },
            {
                breakpoint: 540,
                settings: {
                    arrows: false,
                    dots: false
                }
            }
            ]
        });
    }
    if (!localStorage.beenHereBefore) {
        setTimeout(() => $('.tap-target').tapTarget('open'), 3500);
        localStorage.beenHereBefore = true;
    }

    $('#dismiss').click(() => $('.tap-target').tapTarget('close'));
});
