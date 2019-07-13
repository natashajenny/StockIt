import axios from 'axios';

const BASE_URI = 'http://localhost:4000';

const client = axios.create({
    baseURL: BASE_URI,
    json: true
});

class APIClient {
    constructor(accessToken) {
    this.accessToken = accessToken;
}

getUsers() {
    return this.perform('post', '/register');
}

getPortfolios(userID) {
    return this.perform('get', `/user/${userID}/portfolio`)
}

async perform (method, resource, data) {
    return client({
        method,
        url: resource,
        data,
        headers: {
            Authorization: `Bearer ${this.accessToken}`
        }
    }).then(resp => {
        return resp.data ? resp.data : [];
        })
    }
}

export default APIClient;