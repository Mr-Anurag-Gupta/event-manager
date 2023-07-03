class LocalStorageService {
  load(item) {
    return localStorage.getItem(item);
  }
  save(item, value) {
    localStorage.setItem(item, value);
  }
  remove(item) {
    localStorage.removeItem(item);
  }
  clear() {
    localStorage.clear();
  }
}

let localStorageService = new LocalStorageService();
export default localStorageService;
