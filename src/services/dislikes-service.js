import axios from "axios";

const BASE_URL = "http://localhost:4000";
const USERS_API = `${BASE_URL}/api/users`;

const api = axios.create({
                             withCredentials: true
                         });

export const findAllTuitsDislikedByUser = uid =>
    api.get(`${USERS_API}/${uid}/dislikes`)
        .then(response => response.data);

export const userDislikesTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);
