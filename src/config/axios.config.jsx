import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 60000,
    timeoutErrorMessage: "Server Timed out...",
    responseType: "json",
    headers: {
        "Content-Type": "application/json"
    }
})


// interception 
// req, res
// component => module.service => http.service => axiosInstance ==== Intercept ===> network data =====Request======> Api Server
// API Server === Response ===> netwrok ==== Intercept ===> axiosInstance => htpp.service ==> module.service =====> component

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    }, 
    (exception) => {
        // 400, 422, 401, 403, 404
        if(+exception.status === 400 || +exception.status === 422) {
            throw exception.response
        } else if ( +exception.status === 401) {
            //  refresh token
            throw exception.response
        } else if ( +exception.status === 403) {
            //  refresh token
            throw exception.response
        } else if ( +exception.status === 404) {
            //  refresh token
            throw exception.response
        } else {
            throw exception
        }
    }
)


export default axiosInstance