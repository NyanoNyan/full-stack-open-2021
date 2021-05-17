import axios from 'axios';
const baseUrl = 'https://lit-eyrie-32178.herokuapp.com/api/persons';
// const baseUrl = 'http://localhost:3001/api/persons';

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
};

const deletePost = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response);
}

const updatePost = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data)
}

export default {create, deletePost, updatePost};