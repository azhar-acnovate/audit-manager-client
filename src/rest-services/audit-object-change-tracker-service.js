import config from "../config";
import RestService from "./RestService";

const baseUrl = "/audit-object-change-tracker";

const AuditObjectChangeTrackerServiceAPI = {
    findAll: async () => {
        return await RestService.GetAllData(baseUrl);
    },
    findPagable: async (pageNo) => {
        return await RestService.GetAllData(`${baseUrl}?size=${config.DEFAULT_SIZE_PAGE}&pageNo=${pageNo}`);
    },
    findOne: async (id) => {
        return await RestService.GetByIdData(baseUrl,id);
    },
    createAuditObjectChangeTracker:async(data)=>{
        return await RestService.CreateData(baseUrl,data)
    },
    getDashbordData: async () => {
        return await RestService.GetAllData(baseUrl+"/dashborad");
    },
}
export default AuditObjectChangeTrackerServiceAPI;