import axios from 'axios';

const BASE_URI = 'http://localhost:4000';

const client = axios.create({
    baseURL: BASE_URI,
    json: true,
});

class APIClient {
    registerUser(user) {
        return this.perform('post', '/register', user);
    }
    
    loginUser(user) {
        return this.perform('post', '/login', user);
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
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(resp => {
            return resp.data ? resp.data : [];
        })
    }
}

export default APIClient;