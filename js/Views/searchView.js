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

const renderArtist = (artist, id) => {
    const markup = `
    <div class="col-lg-2 mb-4 animate__animated animate__fadeIn">
        <div class="card-body shadow-sm wrapper-card" id="artist-${id}">
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

const renderTrack = (track, id) => {
    const markup = `
    <div class="col-lg-2 mb-4 animate__animated animate__fadeIn">
        <div class="card-body shadow-sm wrapper-card" id="track-${id}">
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

const renderAlbum = (album, id) => {
    const markup = `
    <div class="col-lg-2 mb-4 animate__animated animate__fadeIn">
        <div class="card-body shadow-sm wrapper-card" id="album-${id}">
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

        data.artists.forEach((current, index) => renderArtist(current, index));
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

        data.tracks.forEach((current, index) => renderTrack(current, index));
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

        data.albums.forEach((current, index) => renderAlbum(current, index));
    }
};

export const clearResults = () => {
    elements.content.innerHTML = '';
}

const formatGenres = genres => {
    let strGenres = genres.map((current) => current[0].toUpperCase() + current.slice(1));
    strGenres = strGenres.join();
    strGenres = strGenres.replaceAll(',', ', ');
    return strGenres;
};

const formatArtists = artists => {
    let strArtists = artists.map((current) => current.name[0].toUpperCase() + current.name.slice(1));
    strArtists = strArtists.join();
    strArtists = strArtists.replaceAll(',', ', ');
    return strArtists;
};

const numberWithCommas = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const convertDuration = milliseconds => {
    let minutes = Math.floor(milliseconds / 60000);
    let seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

const convertDate = date => {
    let newDate = date.slice(8);
    newDate += `/${date.slice(5, 7)}`;
    newDate += `/${date.slice(0, 4)}`;

    return newDate;
};

export const displayArtistModal = artist => {
    // Updating the modal's information with the artist's information
    elements.artistImage.src = `${artist.images.length > 0 ? artist.images[0].url : 'img/img-not-found.png'}`;
    elements.artistName.textContent = `${artist.name}`;
    elements.artistFollowers.textContent = `${numberWithCommas(artist.followers.total)}`;
    elements.artistGenres.textContent = `${artist.genres.length > 0 ? formatGenres(artist.genres) : 'Not informed'}`;
    elements.spotifyArtist.href = `${artist.external_urls.spotify}`;

    // Displayng the modal 
    elements.modalArtist.style.display = 'block';
};

export const displayTrackModal = track => {
    // Updating the modal's information with the track's information
    elements.trackImage.src = `${track.album.images.length > 0 ? track.album.images[0].url : 'img/img-not-found.png'}`;
    elements.trackName.textContent = `${track.name}`;
    elements.trackDuration.textContent = `${convertDuration(track.duration_ms)} minutes`;
    elements.trackArtist.textContent = `${formatArtists(track.artists)}`;
    elements.trackAlbum.textContent = `${track.album.name}`;
    elements.spotifyTrack.href = `${track.external_urls.spotify}`;

    if (track.preview_url) {
        // In case the is a preview, display the player
        elements.trackPreview.style.display = 'block';
        elements.previewControl.style.display = 'block';
        elements.previewControl.src = `${track.preview_url}`;
    } else {
        // In case the is not a preview, hide the player
        elements.trackPreview.style.display = 'none';
        elements.previewControl.style.display = 'none';
        elements.previewControl.src = '#';
    }

    // Displayng the modal 
    elements.modalTrack.style.display = 'block';
};

export const displayAlbumModal = album => {
    // Updating the modal's information with the album's information
    elements.albumImage.src = `${album.images.length > 0 ? album.images[0].url : 'img/img-not-found.png'}`;
    elements.albumName.textContent = `${album.name}`;
    elements.albumTracks.textContent = `${album.total_tracks}`;
    elements.albumRelease.textContent = `${convertDate(album.release_date)}`;
    elements.albumArtist.textContent = `${formatArtists(album.artists)}`;
    elements.spotifyAlbum.href = `${album.external_urls.spotify}`;

    // Displayng the modal 
    elements.modalAlbum.style.display = 'block';
};