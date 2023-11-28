"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.isAuthenticated = exports.getAuthToken = exports.setAuthToken = void 0;
var TOKEN_KEY = 'authToken';

var setAuthToken = function setAuthToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
};

exports.setAuthToken = setAuthToken;

var getAuthToken = function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
};

exports.getAuthToken = getAuthToken;

var isAuthenticated = function isAuthenticated() {
  return !!getAuthToken();
};

exports.isAuthenticated = isAuthenticated;

var logout = function logout() {
  localStorage.removeItem(TOKEN_KEY);
};

exports.logout = logout;