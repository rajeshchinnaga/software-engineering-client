import axios from "axios";

const TUITS_API = "https://adarshreddy-se-node-a3.herokuapp.com/api/tuits";
const USERS_API = "https://adarshreddy-se-node-a3.herokuapp.com/api/users";

export const findAllTuits = () =>
    axios.get(TUITS_API)
        .then(response => response.data);

export const findTuitById = (tid) => {
    return axios.get(`${TUITS_API}/${tid}`)
        .then(response => response.data);
}

export const findTuitByUser = (uid) => {
    return axios.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);
}

export const createTuit = (uid, tuit) => {
    return axios.post(`${USERS_API}/${uid}/tuits`, tuit)
        .then(response => response.data);
}

export const updateTuit = (tid, tuit) => {
    return axios.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);
}

export const deleteTuit = (tid) => {
    return axios.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);
}
