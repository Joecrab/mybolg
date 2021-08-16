import axios from 'axios';

export function request(config){
    let instance = axios.create({
        baseURL: '/api',
        timeout: 30000
    });
    instance.interceptors.response.use(result => {
        return result.data;
    }, err => {
        console.log(err);
    });
    return instance(config);
}