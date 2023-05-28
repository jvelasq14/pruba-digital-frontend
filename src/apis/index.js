import axiosInstance from 'axios';
let local = localStorage.getItem('token');

const instance = axiosInstance.create({
    baseURL : 'http://127.0.0.1:8000/api/auth/',
    headers: {'Authorization': 'Bearer ' + local}
});

export default instance;