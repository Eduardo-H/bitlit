import { clientId, clientSecret } from './credentials.js';

export default class Search {
    constructor(query) {
        this.query = query
    };

    getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });

        const data = await result.json();
        this.token = data.access_token;
    };

    getData = async () => {
        const result = await fetch(`https://api.spotify.com/v1/search?q=${this.query}&type=track%2Cartist%2Calbum`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${this.token}` }
        });

        const data = await result.json();
        this.data = data;
    };
};