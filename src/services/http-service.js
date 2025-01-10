import axiosInstance from "../config/axios.config"

class HttpService {
    config = null;
    // {auth: true}
    setConfig = (reqConfig) => {
        this.config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        // console.log(reqConfig)
        if(reqConfig.file || reqConfig.files) {
            this.config = {
                ...this.config,
                headers: {
                    ...this.config.headers,
                    "Content-Type": "multipart/form-data"
                }
            }
        }

        if(reqConfig.auth) {
            let token = localStorage.getItem("accessToken") || null; 
            if(!token) {
                throw {code: 401, message: "User not loggedIn"}
            }
            this.config = {
                ...this.config,
                headers: {
                    ...this.config.headers,
                    "Authorization": "Bearer "+token,            // TODO: Add keys
                }
            }
        }

        if(reqConfig.refresh) {
            let token = localStorage.getItem("refreshToken") || null; 
            if(!token) {
                throw {code: 401, message: "User not loggedIn"}
            }
            this.config = {
                ...this.config,
                headers: {
                    ...this.config.headers,
                    "Refresh": token,            // TODO: Add keys
                }
            }
        }

        if(reqConfig.params) {
            this.config = {
                headers: {
                    ...this.config.headers
                },
                params: {
                    ...this.config.params, 
                    ...reqConfig.params
                }
            }
        }
    }

    // {auth: true}
    getRequest = async(url, config=null) => {
        try{
            this.config = {};
            if(config) {
                this.setConfig(config)
            }
            const response = await axiosInstance.get(url, this.config)
            return response // undefined
        } catch(exception) {
            console.log("getRequest", exception)
            throw exception
        }
    }

    postRequest = async(url, data ={}, config=null) => {
        try{
            this.config = null;
            if(config) {
                this.setConfig(config)
            }
            // console.log(this.config);
            const response = await axiosInstance.post(url, data, this.config)
            return response // undefined
        } catch(exception) {
            console.log("postRequest", exception)
            throw exception
        }
    }

    putRequest = async (url, data={}, config=null) => {
        try {
            this.config = null
            if(config) {
                this.setConfig(config)
            }
            const response = await axiosInstance.put(url, data, this.config)
            return response;
        } catch(exception) {
            console.log("putRequest", exception)
            throw exception;
        }
    }

    patchRequest = () => {
        
    }

    deleteRequest = async(url, config=null) => {
        try{
            this.config = {};
            if(config) {
                this.setConfig(config)
            }
            const response = await axiosInstance.delete(url, this.config)
            return response // undefined
        } catch(exception) {
            console.log("getRequest", exception)
            throw exception
        }
    }
}

export default HttpService;