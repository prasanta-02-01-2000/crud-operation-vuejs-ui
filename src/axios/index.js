import axios from 'axios';
import Vue from 'vue';

const apiCall = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 10000,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, PATCH, PUT, DELETE, OPTIONS",
        "Accept": "application/json",
    }
});

apiCall.interceptors.response.use(
    response => {
        const self = new Vue();
        if (response.status === 200 || response.status === 201) {
            if (!response.data.status || response.data.status != 'false') {
                return Promise.resolve(response.data);
            }
            else if(response.data.status == 'false'){
                return Promise.resolve(response.data);
            }
            self.notify(response.data.response, 'danger');
            return Promise.reject(response);
        } else {
            self.notify('Something went wrong on Server.', 'danger');
            return Promise.reject(response);
        }
    },
    error => {
        const self = new Vue();
        if (!error.response) {
            self.notify('Something went wrong on Request.', 'danger');
        } else if (error.response.status) {
            switch (error.response.status) {
                case 500:
                    self.notify('Something went wrong.', 'danger');
                    break;
            }
        }
        return Promise.reject(error.response);
    }
);

export default apiCall;