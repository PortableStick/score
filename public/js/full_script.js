'use strict';
$(document).ready(function() {
    const model = _model();
    const controller = _controller(model);
    const view = _view(controller);
    view.init();
});

function _view(_c) {
    // any title shorter than this are difficult to get good results for
    const SHORTTITLE = 7;

    const controller = _c;
    const playlistName = $('#new-playlist-name');
    const playlistDescription = $('#new-playlist-description');
    const playlists = $('#playlists');
    const playlistForm = $('#playlist-form');
    const optionTemplate = Handlebars.compile($('#option-template').html());
    const playlistWidgetTemplate = Handlebars.compile($('#playlist-widget').html());
    const albumTitleTemplate = Handlebars.compile($('#album-template').html());
    const playlistModal = $('#playlist-modal');
    const widget = $('#widget');
    const trackAndAlbumList = $('#album');
    const newPlaylistName = $('#new-playlist-name');
    const newPlaylistDescription = $('#new-playlist-description');

    function resetForm() {
        newPlaylistName.val('');
        newPlaylistDescription.val('');
    }

    function updatePlaylistWidget() {
        if (!controller.currentPlaylist()) { return; }
        controller.getPlaylist()
            .then(data => {
                widget.html(playlistWidgetTemplate(data));
            });
    }

    function setCurrentPlaylist(uri) {
        controller.currentPlaylist(uri);
        updatePlaylistWidget();
    }

    function soundtrackify(title) {
        return title.length < SHORTTITLE ? encodeURIComponent(`${title} soundtrack`) : encodeURIComponent(title);
    }

    function resetPlaylistSelection() {
        const options = $('#playlists option');
        $('#playlists option:selected').removeAttr('selected');
        options.first().attr('selected', 'selected');
        playlists.val(options.first().val());
        playlists.material_select();
        setCurrentPlaylist(options.first().val());
        // TODO: Check out why I was updating here and fix
        //updatePlaylistWidget();
    }

    function populateTracks($currentMovie) {
        const title = soundtrackify($currentMovie.data('title'));
        const year = $currentMovie.data('release-date').slice(0, 4);
        controller.getTracks(title, year)
            .then(albums => {
                if (albums.length) {
                    const trackList = albumTitleTemplate({ albums });
                    trackAndAlbumList.html(trackList);
                    $('.tooltipped').tooltip({ delay: 1000, tooltip: 'Add to playlist', position: 'right' });
                } else {
                    trackAndAlbumList.html($('#empty-track-template').html());
                }

            })
            .catch(error => {
                console.error(error);
            });
    }

    function init() {
        //stuff for slick
        $('.coverflow').on('init', (event, slick) => {
            const $currentMovie = $(`#movie-${slick.currentSlide}`);
            populateTracks($currentMovie);
            $('.display').removeClass('hidden');
        });

        $('.coverflow').on('beforeChange', () => trackAndAlbumList.html($('#progress-template').html()));

        $('.coverflow').on('afterChange', (event, slick, slide) => {
            const $currentMovie = $(`#movie-${slide}`);
            populateTracks($currentMovie);
        });

        $('.coverflow').slick({
            slidesToShow: 1,
            dots: true,
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

        trackAndAlbumList.on('click', '.add-to-list', event => {
            if (playlists[0].length === 1 && playlists[0].options[0].value === '') {
                return Materialize.toast('<div class="problem">You need to create a playlist</div>', 3000);
            }
            controller.addTrackToPlaylist($(event.target).data('uri'))
                .then(() => {
                    Materialize.toast('<div class="success">Added to playlist</div>', 6000);
                    updatePlaylistWidget();
                })
                .catch(error => {
                    console.error(error);
                    Materialize.toast('<div class="problem">There was a problem adding that track</div>', 6000);
                });
        });

        widget.on('click', '.playlist-delete', event => {
            event.preventDefault();
            const id = $(event.target).data('id');
            controller.deleteTrackFromPlaylist(id)
                .then(() => {
                    Materialize.toast('<div class="success">Deleted track from playlist</div>', 6000);
                    updatePlaylistWidget();
                })
                .catch(error => {
                    console.error(error);
                    Materialize.toast('<div class="problem">There was a problem deleting that track</div>', 6000);
                });
        });        

        playlistForm.submit(function(event) {
            event.preventDefault();
            const formData = $(this).serializeArray().reduce((prev, curr) => {
                if (curr.value === '') return prev;
                prev[curr.name] = curr.value;
                return prev;
            }, {});
            resetForm();
            controller.getPlaylists(formData)
                .then(data => {
                    if (playlists[0].options[0].value === '') {
                        playlists.empty().removeAttr('disabled');
                    }
                    playlists.prepend(optionTemplate(data));
                    playlistModal.modal('close');
                    resetPlaylistSelection();
                    playlists.material_select();
                })
                .catch(error => {
                    console.error(error);
                    playlists.prepend('<option value="disabled">There was a problem</option>');
                });
        });

        playlists.change(function(event) {
            setCurrentPlaylist(event.target.selectedOptions[0].value);
        });

        //stuff for materialize
        $('.dropdown-button').dropdown();
        $('.button-collapse').sideNav();
        $('select').material_select();
        $('#new-playlist-description').trigger('autoresize');
        playlistModal.modal();

        if (playlists[0].length && playlists[0].options[0].value !== '') {
            setCurrentPlaylist(playlists[0].selectedOptions[0].value);
        }
    }
    return { init };
}

function _controller(_m) {
    const model = _m;

    let currentPlaylist = undefined;

    function getPlaylistId(uri) {
        const items = uri.split(':');
        const lastItem = items.length - 1;
        return items[lastItem];
    }

    function getIdFromUri() {
        return getPlaylistId(currentPlaylist);
    }

    return {
        currentPlaylist: _ => {
            if (!_) return currentPlaylist;
            currentPlaylist = _;
            return currentPlaylist;
        },
        getPlaylists: data => model.postJSON('/playlists', data),
        getTracks: (title, year) => model.getJSON(`/tracks/${title}?year=${year}`),
        addTrackToPlaylist: track => {
            const data = {
                uri: track
            };
            return model.putJSON(`/playlists/${getIdFromUri()}/tracks`, data);
        },
        deleteTrackFromPlaylist: uri => model.deleteJSON(`/playlists/${getIdFromUri()}/tracks`, { uri }),
        getPlaylist: () => model.getJSON(`/playlists/${getIdFromUri()}`)
    }; 
}

function _model() {

    function handleResponse(response) {
        if (response.ok) return response.json();
        return Promise.reject(response);
    }

    function postJSON(url, body) {
        return fetch(url, { method: 'POST', body: JSON.stringify(body), headers: { 'content-type': 'application/json' }, credentials: 'same-origin' })
            .then(handleResponse);
    }

    function getJSON(url) {
        return fetch(url, { credentials: 'same-origin' })
            .then(handleResponse);
    }

    function putJSON(url, body = {}) {
        return fetch(url, { method: 'PUT', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    }

    function deleteJSON(url, body = {}) {
        return fetch(url, { method: 'DELETE', credentials: 'same-origin', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    }

    return { postJSON, getJSON, putJSON, deleteJSON };
}
