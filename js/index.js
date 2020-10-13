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