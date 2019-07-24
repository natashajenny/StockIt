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

    getPortfolios(userId) {
        return this.perform('get', `/user/${userId}/portfolio`)
    }

    addPortfolio(userId, portfolio) {
        return this.perform('post', `/user/${userId}/portfolio`, portfolio)
    }

    getStocks() {
        return this.perform('get', '/company')
    }
    
    getPortfolioStocks(userId, portfolioId) {
        return this.perform('get', `/user/${userId}/portfolio/${portfolioId}`)
    }

    addPortfolioStock(userId, portfolioId, stock) {
        return this.perform('post', `/user/${userId}/portfolio/${portfolioId}`, stock);
    }

    deletePortfolioStock(userId, portfolioId, code) {
        return this.perform('delete', `/user/${userId}/portfolio/${portfolioId}/delete/${code}`);
    }
    
    updatePortfolioStock(userId, portfolioId, code, stock) {
        return this.perform('post', `/user/${userId}/portfolio/${portfolioId}/update/${code}`, stock);
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