import localStorageService from "../services/LocalStorageService";

class Helpers {
  getTokenDuration() {
    const storedExpiration = localStorageService.load("expiration");
    const expiration = new Date(storedExpiration);
    let now = new Date();
    let duration = expiration.getTime() - now.getTime();
    return duration;
  }
}

let helpers = new Helpers();
export default helpers;
