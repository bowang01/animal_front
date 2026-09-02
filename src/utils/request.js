import axios from 'axios'
import router from "@/router";

export const API_BASE = process.env.VUE_APP_BASE_API || 'http://localhost:9090'

const request = axios.create({
    baseURL: API_BASE,
    timeout: 5000
})

// request interceptor
// Process the request before it is sent
// e.g. attach token uniformly, encrypt request params
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    let user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
    if (user) {
        config.headers['token'] = user.token;  // Set request header
    }

    return config
}, error => {
    return Promise.reject(error)
});

// response interceptor
// Handle the response results uniformly after the API returns
request.interceptors.response.use(
    response => {
        let res = response.data;
        // If the response is a file
        if (response.config.responseType === 'blob') {
            return res
        }
        // Compatible with string data returned by the server
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        // Prompt when permission verification fails
        if (res.code === '401') {
            const path = router.currentRoute.path
            // Keep public front pages browsable; only force login on admin routes
            if (!path.startsWith('/front') && path !== '/login' && path !== '/register') {
                router.push("/login")
            }
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request
