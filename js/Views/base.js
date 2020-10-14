export const elements = {
    searchInput: document.querySelector('#search-input'),
    searchButton: document.querySelector('#search-btn'),
    content: document.querySelector('.content'),
    artists: document.querySelector('.artist-row'),
    tracks: document.querySelector('.track-row'),
    albums: document.querySelector('.album-row'),

    // Modal
    modalArtist: document.querySelector('#artist-modal'),
    modalTrack: document.querySelector('#track-modal'),
    modalButton: document.querySelector('#artist-0'),
    closeModal: document.getElementsByClassName('close'),

    // Artist modal
    artistImage: document.querySelector('.artist-modal-img'),
    artistName: document.querySelector('.artist-modal-name'),
    artistFollowers: document.querySelector('.artist-modal-followers'),
    artistGenres: document.querySelector('.artist-modal-genre'),
    spotifyArtist: document.querySelector('.spotify-artist'),

    // Track modal
    trackImage: document.querySelector('.track-modal-img'),
    trackName: document.querySelector('.track-modal-name'),
    trackDuration: document.querySelector('.track-modal-duration'),
    trackArtist: document.querySelector('.track-modal-artist'),
    trackAlbum: document.querySelector('.track-modal-album'),
    spotifyTrack: document.querySelector('.spotify-track'),
    trackPreview: document.querySelector('.track-preview'),
    previewControl: document.querySelector('.preview-control')
};

export const renderLoader = parent => {
    const loader = `
        <div class="loader row justify-content-center">
            <img src="img/loader.gif" />
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
};