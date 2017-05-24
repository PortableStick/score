$(document).ready(() => {
    const $coverflow = $('.coverflow')

    $coverflow.on('init', (event, slick) => {
        $('.display').removeClass('hidden')
    })
    $coverflow.slick({
        slidesToShow: 1,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: '<button type="button" class="btn btn-large next"><i class="material-icons">skip_previous</i></button>',
        nextArrow: '<button type="button" class="btn btn-large previous"><i class="material-icons">skip_next</i></button>',
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
    })
})