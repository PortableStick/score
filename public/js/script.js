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
            centerPadding: '60px',
            centerMode: true,
            slidesToShow: 3,
            dots: true
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