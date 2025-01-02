import HttpService from "../../services/http-service";

class BrandService extends HttpService {
    createBrand = async(data) => {
        try {
            const response = await this.postRequest('/brand', data, {auth: true, file: true})
            return response
        } catch(exception) {
            throw exception
        }
    }

    listAllBrands = async({
        page=1, 
        limit=10,
        keyword= null
    })  => {
        try {
            let response = await this.getRequest('/brand', {
                auth: true,
                params: {
                    page, 
                    limit, 
                    keyword
                }
            })
            return response;
        } catch(exception) {
            console.log("ListAllBrands", exception)
            throw exception;
        }
    }

    deleteBrandById = async(brandId) => {
        try {
            let res = await this.deleteRequest('/brand/'+brandId, {auth: true});
            return res;
        } catch(exception) {
            throw exception;
        }
    }

    getBrandById = async(brandId) => {
        try {
            const res = await this.getRequest('/brand/'+brandId, {auth: true});
            return res;
        } catch(exception) {
            throw exception
        }
    }
    editBrandById = async(brandId, data) => {
        try {
            const res = await this.putRequest('/brand/'+brandId, data, {auth: true, file: true});
            return res;
        } catch(exception) {
            throw exception;
        }
    }
} 
 
const brandSvc = new BrandService()
export default brandSvc;