import HttpService from "../../services/http-service";
import { getCookie, setCookie } from "../../utilities/helpers";

class AuthService extends HttpService {
    registerUser = async (data) => {
        try{
            const result = await this.postRequest('auth/register', data, {file: true})
            return result;
        } catch(exception) {
            console.log("registerUser", exception)
            throw exception
        }
    }

    activateUsingOTP = async (data) => {
        try{
            const result = await this.putRequest('auth/activate', data)
            return result;
        } catch(exception) {
            console.log("registerUser", exception)
            throw exception
        }
    }

    resendOTP = async(data) =>{
        try{
            const result = await this.postRequest('auth/resend-otp', data)
            return result;
        } catch(exception) {
            console.log("registerUser", exception)
            throw exception
        }
    }

    getLoggedInUser = async() => {
        try {
            const response = await this.getRequest('/auth/me', {auth: true})
            return response.data.data;
        } catch(exception) {
            throw exception;
        }
    }

    loginUser = async(data) => {
        try {
            const response = await this.postRequest('/auth/login', data)
            
            // setCookie('accessToken', response.data.data.accessToken, 1)
            // setCookie('refreshToken', response.data.data.refreshToken, 15)
            // // cookie, localstorage
            localStorage.setItem('accessToken', response.data.data.accessToken);
            localStorage.setItem('refreshToken', response.data.data.refreshToken);

            //
            // setCookie('accessToken', '', -1)
            // console.log(getCookie('accessToken'));
            return response;
        } catch(exception) {
            // console.log("loginUser", exception)
            throw exception
        }
    }
}

const authSvc = new AuthService()
export default authSvc