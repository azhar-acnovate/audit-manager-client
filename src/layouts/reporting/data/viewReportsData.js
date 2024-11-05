import ArgonTypography from "../../../components/ArgonTypography";
import { DateFormatter } from "../../../utils/DateFormatter";

export function viewReportsTableData(data) {
   
    return {
        filterIntialValue: {
            sort: {},
            filter: {}
        },
        columns: [
            { name: "reportName", label: "Report Name", align: "left" },
            { name: "sourceReferences", label: "Object Tracker Type", align: "center" },
            { name: "createdAt", label: "Date Created", align: "center" },
            { name: "action", label: "Actions", align: "center" },
        ],
        rows: data == null ? [] : data.map((report) => ({
            reportName: (
                <ArgonTypography px={2} variant="caption" color="secondary" fontWeight="medium">
                    {report.reportName}
                </ArgonTypography>
            ),
            sourceReferences: (
                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                    <div>
                        {report.sourceReferences && (
                            <ul>
                                {report.sourceReferences.map((item, index) => (
                                    <li key={index}>
                                        {item.sourceReferenceName} - {item.sourceReferenceKey}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                </ArgonTypography>
            ),
            createdAt: (
                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                    {DateFormatter.convertUTCToLocalTime(report.createdAt)}
                </ArgonTypography>
            ),
            item: report
        }))
    };
}
