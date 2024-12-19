import HttpService from "../../services/http-service";

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
}

const authSvc = new AuthService()
export default authSvc