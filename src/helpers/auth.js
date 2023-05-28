import axios from 'axios'

function iniAxiosInterceptors(){
    axios.interceptors.request.use(function(config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `bearer ${token}`;
        }
        return config;
    });
}

export default iniAxiosInterceptors;