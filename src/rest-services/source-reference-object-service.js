import config from "../config";
import RestService from "./RestService";

const baseUrl = "/source-reference-object";

const SourceReferenceObjectServiceAPI = {
    findAll: async () => {
        return await RestService.GetAllData(baseUrl);
    },
    findPagable: async (pageNo,inputValue,size) => {
        
        return await RestService.GetAllData(`${baseUrl}?size=${size??config.DEFAULT_SIZE_PAGE}&pageNo=${pageNo}&inputValue=${inputValue??null}`);
    },
    findOne: async (id) => {
        return await RestService.GetByIdData(baseUrl,id);
    },
    create:async(data)=>{
        return await RestService.CreateData(baseUrl,data)
    }
}
export default SourceReferenceObjectServiceAPI;