import RestService from "./RestService";

const BASE_URL = "/scheduling-audit-report";

const schedulingReportService = {
    saveReport: async (data) => {
        try {
            const response = await RestService.CreateData(BASE_URL, data);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },

    cancelReport: async (id) => {
        try {
            const response = await RestService.GetByIdData(`${BASE_URL}/cancel`, id);
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },
    rescheduleReport: async (id) => {
        try {
            const response = await RestService.GetByIdData(`${BASE_URL}/reschdule`, id);
            return response;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    },
 
    getSavedReports: async () => {
        try {
            
            const data = await RestService.GetAllData(BASE_URL); 
            return data;
        } catch (error) {
            console.error("Error fetching saved reports:", error);
            throw error;
        }
    },
};

export default schedulingReportService;
