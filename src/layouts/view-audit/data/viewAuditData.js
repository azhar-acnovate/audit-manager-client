import ArgonTypography from "../../../components/ArgonTypography";


export function viewAuditTableData(data) {
    console.log("Tale Data",data)
    return {
        filterIntialValue : {
            sort: {},
            filter: {}
        },
        columns: [
            { name: "refObjectId", label: "Object ID", align: "left" },
            { name: "eventType", label: "Event Type", align: "left" },
            { name: "eventOccurence", label: "Event Occurrence", align: "center" },
            { name: "action", label: "Actions", align: "center" },
        ],
        rows:data==null?[]: data.map((audit) => ({
            refObjectId: (
                <ArgonTypography px={4} variant="caption" color="secondary" fontWeight="medium">
                    {audit.refObjectId}
                </ArgonTypography>
            ),
            eventType: (
                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                    {audit.eventType}
                </ArgonTypography>
            ),
            eventOccurence: (
                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                    {audit.eventOccurence}
                </ArgonTypography>
            ),
            subData: audit.attributeChanges,
            item:audit
        }))
    };
}
