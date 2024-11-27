import axios from "axios";
import config from "../config";
import RestService from "./RestService";

const baseUrl = "/audit-report";

const AuditReportServiceAPI = {
    findAll: async () => {
        return await RestService.GetAllData(baseUrl);
    },
    findPagable: async (pageNo) => {
        return await RestService.GetAllData(`${baseUrl}?size=${config.DEFAULT_SIZE_PAGE}&pageNo=${pageNo}`);
    },
    findOne: async (id) => {
        return await RestService.GetByIdData(baseUrl, id);
    },
    create: async (data) => {
        return await RestService.CreateData(baseUrl, data)
    },
    downloadReport: async (fileType, reportIds) => {
        const encodedCredentials = localStorage.getItem('encodedCredentials');
        const config = {
            params: {
                fileType,
                reportIds
            },
            paramsSerializer: (params) => {
                // Custom serialization for reportIds array
                return Object.keys(params).map(key => {
                    if (Array.isArray(params[key])) {
                        return params[key].map(item => `${key}=${encodeURIComponent(item)}`).join('&');
                    }
                    return `${key}=${encodeURIComponent(params[key])}`;
                }).join('&');
            },
            responseType: 'blob', // important to handle binary data (file download),
            headers: {
                'Authorization': `Bearer ${encodedCredentials}`
            }
        };
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/audit-report/generate-report`, config);
        // Create a URL for the blob
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);

        // Set the file name for download
        const filename = response.headers['content-disposition']
            ? response.headers['content-disposition'].split('filename=')[1]
            : `report.${fileType}`;

        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
    }
}
export default AuditReportServiceAPI;