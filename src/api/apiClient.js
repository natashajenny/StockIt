import axios from 'axios';

const BASE_URI = 'http://localhost:4000';

const client = axios.create({
    baseURL: BASE_URI,
    json: true,
});

class APIClient {
    // getParams (obj) {
    //     const params = new URLSearchParams();
    //     const keys = Object.keys(obj);
    //     for(let k of keys){
    //         params.append(k, obj[k]);
    //     }
    //     return params;
    // }
    
    registerUser(user) {
        return this.perform('post', '/register', user);
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