import Search from './Models/Search.js';
import * as searchView from './Views/searchView.js';

const state = {};

const controlSearch = async () => {
    const query = searchView.getQuery();

    if (query) {
        searchView.clearSearchInput();
        state.search = new Search(query);

        try {
            await state.search.getToken();
            await state.search.getData();
            console.log(state.search);
            searchView.renderResults(state.search);
        } catch (error) {
            console.log(error);
        }
    }
}

document.querySelector('#search-btn').addEventListener('click', controlSearch);