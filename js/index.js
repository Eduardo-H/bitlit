import Search from './Models/Search.js';
import * as searchView from './Views/searchView.js';
import { elements, renderLoader, clearLoader } from './Views/base.js';

const state = {};

const controlSearch = async () => {
    const query = searchView.getQuery();

    if (query) {
        searchView.clearSearchInput();
        searchView.clearResults();
        state.search = new Search(query);
        // Rendering loader
        renderLoader(elements.content);
        try {
            // Getting token the be able to fetch data
            await state.search.getToken();
            // Fetching data
            await state.search.getData();
            // Deleting loader
            clearLoader();
            // Showing results
            searchView.renderResults(state.search);
        } catch (error) {
            console.log(error);
        }
    }
}

elements.searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    controlSearch();
});

elements.searchInput.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
        controlSearch();
    }
});

// Modals events
elements.content.addEventListener('click', (e) => {
    if (e.target.matches('.wrapper-card, .wrapper-card *')) {
        e.path.forEach(current => {
            if (current.id) {
                let id = current.id;
                id = id.split('-');

                switch (id[0]) {
                    case 'artist':
                        searchView.displayArtistModal(state.search.artists[parseInt(id[1])]);
                        break;
                    case 'track':
                        searchView.displayTrackModal(state.search.tracks[parseInt(id[1])]);
                        break;
                    case 'album':
                        searchView.displayAlbumModal(state.search.albums[parseInt(id[1])])
                        break;
                }
            }
        });
    }
});

// Setting event listener for all close buttons
for (let i = 0; i < elements.closeModal.length; i++) {
    elements.closeModal[i].addEventListener('click', () => {
        elements.modalArtist.style.display = 'none';
        elements.modalTrack.style.display = 'none';
        elements.modalAlbum.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target == elements.modalArtist) {
        elements.modalArtist.style.display = 'none';
    }
    if (e.target == elements.modalTrack) {
        elements.modalTrack.style.display = 'none';
        // Pausing the music when clicking outside of the modal
        elements.previewControl.pause();
    }
    if (e.target == elements.modalAlbum) {
        elements.modalAlbum.style.display = 'none';
    }
});