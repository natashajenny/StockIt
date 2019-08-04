import axios from "axios";

const BASE_URI = "http://localhost:4000";

const client = axios.create({
  baseURL: BASE_URI,
  json: true
});

class APIClient {
  registerUser(user) {
    return this.perform("post", "/register", user);
  }

  loginUser(user) {
    return this.perform("post", "/login", user);
  }

  getPortfolios(userId) {
    return this.perform("get", `/user/${userId}/portfolio`);
  }

  addPortfolio(userId, portfolio) {
    return this.perform("post", `/user/${userId}/portfolio`, portfolio);
  }

  getStocks() {
    return this.perform("get", "/company");
  }

  getStockDetails(code) {
    return this.perform("get", `/company/${code}`);
  }

  addWatchlist(userId, code) {
    return this.perform("post", `/user/${userId}/watchlist/${code}`);
  }

  getWatchlist(userId, code) {
    return this.perform("get", `/user/${userId}/watchlist`, code);
  }

  getPortfolioStocks(userId, portfolioId) {
    return this.perform("get", `/user/${userId}/portfolio/${portfolioId}`);
  }

  addPortfolioStock(userId, portfolioId, stock) {
    return this.perform(
      "post",
      `/user/${userId}/portfolio/${portfolioId}`,
      stock
    );
  }

  deletePortfolioStock(userId, portfolioId, code) {
    return this.perform(
      "delete",
      `/user/${userId}/portfolio/${portfolioId}/delete/${code}`
    );
  }

  updatePortfolioStock(userId, portfolioId, code, stock) {
    return this.perform(
      "post",
      `/user/${userId}/portfolio/${portfolioId}/update/${code}`,
      stock
    );
  }

  addWatchlistStock(userId, code, stock) {
    return this.perform(
      "post",
      `/user/${userId}/watchlist/${code}/set_alerts`,
      stock
    );
  }

  getWatchlistStocks(userId) {
    return this.perform("get", `/user/${userId}/watchlist`);
  }

  gettopten() {
    return this.perform("get","/top_ten" );
  }

  getbotten() {
    return this.perform("get","/bottom_ten" );
  }

  updateWatchlistStock(userId, code, stock) {
    return this.perform(
      "post",
      `/user/${userId}/watchlist/${code}/update_alerts`,
      stock
    );
  }

  deleteWatchlistStock(userId, code) {
    return this.perform("delete", `/user/${userId}/delete_wl/${code}`);
  }

  async perform(method, resource, data) {
    return client({
      method,
      url: resource,
      data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(resp => {
      return resp.data ? resp.data : [];
    });
  }

  getGraph(type, stocks, start_date, end_date){
    return this.perform("get",`/grapher/${type}/${stocks}/${start_date}/${end_date}`);
  }
}

export default APIClient;
