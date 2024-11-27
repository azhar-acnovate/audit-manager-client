import RestService from "./RestService";

const baseUrl = "/audit-attibute-change-tracker";

const AuditAttributeChangeTrackerServiceAPI = {
    findAll: async () => {
        return await RestService.GetAllData(baseUrl);
    },
    createAuditAttributeChangeTracker:async(data)=>{
        return await RestService.CreateData(baseUrl,data)
    }
}
export default AuditAttributeChangeTrackerServiceAPI;