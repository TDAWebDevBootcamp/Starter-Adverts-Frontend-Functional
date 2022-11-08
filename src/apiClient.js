import axios from "axios";
const url = "http://localhost:3001/";

export class ApiClient {
  constructor(tokenProvider, logoutHandler) {
    this.tokenProvider = tokenProvider;
    this.logoutHandler = logoutHandler;
  }

  // the call function to access protected endpoints
  authenticatedCall(method, url, data) {
    return axios({
      method,
      url,
      headers: {
        // function that returns the token in state
        authorization: this.tokenProvider(),
      },
      data,
    }).catch((error) => {
      if (error.response.status === 403) {
        //this.logoutHandler()
        return Promise.reject();
      } else {
        throw error;
      }
    });
  }
  async login(userName, password) {
    return axios({
      method: "post",
      url: `${url}auth`,
      data: {
        userName,
        password,
      },
    }).catch((error) => {
      throw error;
    });
  }

  getAds() {
    return this.authenticatedCall("get", url);
  }

  addAd(name, price) {
    return this.authenticatedCall("post", url, { name, price });
  }

  removeAd(id) {
    return this.authenticatedCall("delete", `${url}${id}`);
  }

  updateAd(id, name, price) {
    return this.authenticatedCall("put", `${url}${id}`, { name, price });
  }
}
