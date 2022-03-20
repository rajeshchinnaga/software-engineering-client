import axios from "axios";
const BASE_URL = "https://adarshreddy-se-node-a3.herokuapp.com/api";
// const BASE_URL = "http://localhost:4000/api";

const LOGIN_API = `${BASE_URL}/login`;
const USERS_API = `${BASE_URL}/users`;

export const createUser = (user) => {
  return axios.post(`${USERS_API}`, user)
      .then(response => response.data);
}

export const findAllUsers = () => {
  return axios.get(USERS_API)
      .then(response => response.data);
}

export const findUserById = (uid) => {
  return axios.get(`${USERS_API}/${uid}`)
      .then(response => response.data);
}

export const deleteUser = (uid) => {
  return axios.delete(`${USERS_API}/${uid}`)
      .then(response => response.data);
}

export const deleteUsersByUsername = (username) => {
  return axios.get(`${USERS_API}/username/${username}/delete`)
      .then(response => response.data);
}

export const findUserByUsername = (username) => {
  return axios.get(`${USERS_API}/username/${username}/find`)
      .then(response => response.data);
}

export const findUserByCredentials = (credentials) => {
  return axios.post(`${LOGIN_API}`, credentials)
      .then(response => response.data);
}

const service = {
  findAllUsers
}

export default service;