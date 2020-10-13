import { elements } from './base.js';

export const getQuery = () => {
    let query = elements.searchInput.value;
    query = query.replace(' ', '%20');
    return query;
};

export const clearSearchInput = () => {
    elements.searchInput.value = '';
};

const formatName = name => {
    if (name.length > 12) {
        name = name.substring(0, 12) + '...';
    }
    return name;
};

const renderArtist = artist => {
    const markup = `
    <div class="col-lg-2 mb-4 animate__animated animate__fadeIn">
        <div class="card-body shadow-sm wraper-card">
            <div class="artist-info d-flex flex-column mx-auto align-items-center mr-5">
                <div class="artist-image">
                    <img src="${artist.images.length > 0 ? artist.images[0].url : 'img/img-not-found.png'}" alt="${artist.name}">
                </div>
                <div class="artist-name">
                    <p>${window.innerWidth > 991 ? formatName(artist.name) : artist.name}</p>
                </div>
            </div>
        </div>
    </div>
    `;

    document.querySelector('.artist-row').insertAdjacentHTML('beforeend', markup);
}

const renderTrack = track => {
    const markup = `
    <div class="col-lg-2 mb-4 animate__animated animate__fadeIn">
        <div class="card-body shadow-sm wraper-card">
            <div class="track-info d-flex flex-column mx-auto align-items-center mr-5">
                <div class="track-image">
                    <img src="${track.album.images.length > 0 ? track.album.images[0].url : 'img/img-not-found.png'}" alt="${track.name}">
                </div>
                <div class="track-name">
                    <p>${window.innerWidth > 991 ? formatName(track.name) : track.name}</p>
                </div>
            </div>
        </div>
    </div>
    `;

    document.querySelector('.track-row').insertAdjacentHTML('beforeend', markup);
};

const renderAlbum = album => {
    const markup = `
    <div class="col-lg-2 mb-4 animate__animated animate__fadeIn">
        <div class="card-body shadow-sm wraper-card">
            <div class="album-info d-flex flex-column mx-auto align-items-center mr-5">
                <div class="album-image shadow">
                    <img src="${album.images.length > 0 ? album.images[0].url : 'img/img-not-found.png'}" alt="${album.name}">
                </div>
                <div class="album-name">
                    <p>${window.innerWidth > 991 ? formatName(album.name) : album.name}</p>
                </div>
            </div>
        </div>
    </div>
    `;

    document.querySelector('.album-row').insertAdjacentHTML('beforeend', markup);
};

export const renderResults = data => {
    if (data.artists.length > 0) {
        const artistMarkup = `
        <div class="artists mb-3 animate__animated animate__fadeIn">
            <h4 class="type-title">Artists</h4>
            <div class="artist-row row justify-content-start">
            </div>
        </div>
        `;
        elements.content.insertAdjacentHTML('beforeend', artistMarkup);

        data.artists.forEach(current => renderArtist(current));
    }
    if (data.tracks.length > 0) {
        const trackMarkup = `
        <div class="tracks mb-3">
            <h4 class="type-title">Tracks</h4>
            <div class="track-row row justify-content-start">
            </div>
        </div>
        `;
        elements.content.insertAdjacentHTML('beforeend', trackMarkup);

        data.tracks.forEach(current => renderTrack(current));
    }
    if (data.albums.length > 0) {
        const albumMarkup = `
        <div class="albums mb-3">
            <h4 class="type-title">Albums</h4>
            <div class="album-row row justify-content-start">
            </div>
        </div>
        `;
        elements.content.insertAdjacentHTML('beforeend', albumMarkup);

        data.albums.forEach(current => renderAlbum(current));
    }
};

export const clearResults = () => {
    elements.content.innerHTML = '';
}