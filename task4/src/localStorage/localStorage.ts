export function saveToLocalStorage(key: string, email: string) {
  localStorage.setItem('apiKey', key);
  localStorage.setItem('email', email);
}
