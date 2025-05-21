// src/utils/auth.js

export function login(username, password) {
  if (username === 'admin' && password === 'admin123') {
    localStorage.setItem('isAuthenticated', 'true');
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem('isAuthenticated');
}

export function isAuthenticated() {
  return localStorage.getItem('isAuthenticated') === 'true';
}
