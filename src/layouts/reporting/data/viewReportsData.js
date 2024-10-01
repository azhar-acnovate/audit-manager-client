import ArgonTypography from "../../../components/ArgonTypography";

// export const dummyData = [
//     {
//         "id": 1,
//         "reportName": "daily report",
//         "objectTrackerType": "Product",
//         "createAt": "24-09-2024"
//     },
//     {
//         "id": 2,
//         "reportName": "weekly report",
//         "objectTrackerType": "Product",
//         "createAt": "24-09-2024"
//     },
//     {
//         "id": 3,
//         "reportName": "Product Report",
//         "objectTrackerType": "Product",
//         "createAt": "24-09-2024"
//     },
//     {
//         "id": 4,
//         "reportName": "Colors report",
//         "objectTrackerType": "colors",
//         "createAt": "24-09-2024"
//     },
    
// ]

export function viewReportsTableData(data) {
    console.log("Tale Data", data)
    return {
        filterIntialValue: {
            sort: {},
            filter: {}
        },
        columns: [
            { name: "reportName", label: "Report Name", align: "left" },
            { name: "refObjectId", label: "Object Tracker Type", align: "left" },
            { name: "createdAt", label: "Date Created", align: "center" },
            { name: "action", label: "Actions", align: "center" },
        ],
        rows: data == null ? [] : data.map((report) => ({
            reportName: (
                <ArgonTypography px={2} variant="caption" color="secondary" fontWeight="medium">
                    {report.reportName}
                </ArgonTypography>
            ),
            refObjectId: (
                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                    {report.refObjectId}
                </ArgonTypography>
            ),
            createdAt: (
                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                    {report.createdAt}
                </ArgonTypography>
            ),
            item: report
        }))
    };
}
