import HttpService from "../../services/http-service";

class BannerService extends HttpService {
    createBanner = async(data) => {
        try {
            const response = await this.postRequest('/banner', data, {auth: true, file: true})
            return response
        } catch(exception) {
            throw exception
        }
    }
}

const bannerSvc = new BannerService()
export default bannerSvc;