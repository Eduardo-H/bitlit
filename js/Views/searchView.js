import { elements } from './base.js';

export const getQuery = () => {
    let query = elements.searchInput.value;
    query = query.replace(' ', '%20');
    return query;
};

export const clearSearchInput = () => {
    elements.searchInput.value = '';
};

const renderArtist = artist => {
    const markup = `
    <div class="col-lg-2 mb-3 animate__animated animate__fadeIn">
        <div class="card-body shadow-sm wraper-card">
            <div class="artist-info d-flex flex-column mx-auto align-items-center mr-5">
                <div class="artist-image">
                    <img src="${artist.images.length > 0 ? artist.images[0].url : 'img/img-not-found.png'}" alt="${artist.name}">
                </div>
                <div class="artist-name">
                    <p>${artist.name}</p>
                </div>
            </div>
        </div>
    </div>
    `;

    elements.artists.insertAdjacentHTML('beforeend', markup);
}

const renderTrack = track => {
    const markup = `
    <div class="col-lg-2 mb-3 animate__animated animate__fadeIn">
        <div class="card-body shadow-sm wraper-card">
            <div class="track-info d-flex flex-column mx-auto align-items-center mr-5">
                <div class="track-image">
                    <img src="${track.album.images.length > 0 ? track.album.images[0].url : 'img/img-not-found.png'}" alt="${track.name}">
                </div>
                <div class="track-name">
                    <p>${track.name}</p>
                </div>
            </div>
        </div>
    </div>
    `;

    elements.tracks.insertAdjacentHTML('beforeend', markup);
};

const renderAlbum = album => {
    const markup = `
    <div class="col-lg-2 mb-3 animate__animated animate__fadeIn">
        <div class="card-body shadow-sm wraper-card">
            <div class="album-info d-flex flex-column mx-auto align-items-center mr-5">
                <div class="album-image shadow">
                    <img src="${album.images.length > 0 ? album.images[0].url : 'img/img-not-found.png'}" alt="${album.name}">
                </div>
                <div class="album-name">
                    <p>${album.name}</p>
                </div>
            </div>
        </div>
    </div>
    `;

    elements.albums.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = data => {
    if (data.artists.length > 0) {
        data.artists.forEach(current => renderArtist(current));
    }
    if (data.tracks.length > 0) {
        data.tracks.forEach(current => renderTrack(current));
    }
    if (data.albums.length > 0) {
        data.albums.forEach(current => renderAlbum(current));
    }
};