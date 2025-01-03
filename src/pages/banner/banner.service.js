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

    listAllBanners = async({
        page=1, 
        limit=10,
        keyword= null
    })  => {
        try {
            let response = await this.getRequest('/banner', {
                auth: true,
                params: {
                    page, 
                    limit, 
                    keyword
                }
            })
            return response;
        } catch(exception) {
            console.log("ListAllBanners", exception)
            throw exception;
        }
    }

    deleteBannerById = async(bannerId) => {
        try {
            let res = await this.deleteRequest('/banner/'+bannerId, {auth: true});
            return res;
        } catch(exception) {
            throw exception;
        }
    }

    getBannerById = async(bannerId) => {
        try {
            const res = await this.getRequest('/banner/'+bannerId, {auth: true});
            return res;
        } catch(exception) {
            throw exception
        }
    }
    editBannerById = async(bannerId, data) => {
        try {
            const res = await this.putRequest('/banner/'+bannerId, data, {auth: true, file: true});
            return res;
        } catch(exception) {
            throw exception;
        }
    }
} 
 
const bannerSvc = new BannerService()
export default bannerSvc;