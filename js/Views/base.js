export const elements = {
    searchInput: document.querySelector('#search-input'),
    searchButton: document.querySelector('#search-btn'),
    content: document.querySelector('.content'),
    artists: document.querySelector('.artist-row'),
    tracks: document.querySelector('.track-row'),
    albums: document.querySelector('.album-row'),
    modalArtist: document.querySelector('#artist-modal'),
    modalButton: document.querySelector('#artist-0'),
    closeModal: document.getElementsByClassName('close')[0],
    spotifyButton: document.querySelector('.spotify-btn'),
    artistImage: document.querySelector('.artist-modal-img'),
    artistName: document.querySelector('.artist-modal-name'),
    artistFollowers: document.querySelector('.artist-modal-followers'),
    artistGenres: document.querySelector('.artist-modal-genre')

}

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