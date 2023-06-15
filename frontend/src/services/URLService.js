class URLService {
  getBaseUrl() {
    return process.env.REACT_APP_API_URL;
  }
  getEventsUrl() {
    return process.env.REACT_APP_API_URL + "events";
  }
}

let urlService = new URLService();
export default urlService;
