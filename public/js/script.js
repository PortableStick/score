$(document).ready(function() {
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
    });

    $('.coverflow').on('afterChange', (event, slick, slide) => {
        let currentMovie = $(`#movie-${slide}`)
        let title = currentMovie.data('title')
        $('#name').html(title)
    })

    $('.dropdown-button').dropdown()
});