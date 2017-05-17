$(document).ready(function() {
    const view = _view()
    view.init()
});

function _view() {
    function init() {
        //stuff for slick
        $('.coverflow').on('init', (event, slick) => {
            let currentMovie = $(`#movie-${slick.currentSlide}`)
            let title = currentMovie.data('title')
            $('#name').html(title)
        })
        $('.coverflow').slick({
            slidesToShow: 1,
            dots: true,
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
        $('.coverflow').on('afterChange', (event, slick, slide) => {
            let currentMovie = $(`#movie-${slide}`)
            let title = currentMovie.data('title')
            $('#name').html(title)
        })

        //stuff for materialize
        $('.dropdown-button').dropdown()
        $('.button-collapse').sideNav()
        $('select').material_select()
        $('#new-playlist-description').trigger('autoresize')
        $('.modal').modal()
    }
    return { init }
}