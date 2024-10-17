import ArgonTypography from "../../../components/ArgonTypography";


export function viewAuditTableData(data) {
   
    return {
        filterIntialValue : {
            sort: {},
            filter: {}
        },
        columns: [
            // { name: "refObjectId", label: "Object ID", align: "left" },
            { name: "sourceName", label: "Source Name", align: "left" },
            { name: "sourceKey", label: "Source Key", align: "left" },
            { name: "eventType", label: "Event Type", align: "left" },
            { name: "eventOccurence", label: "Event Occurrence", align: "center" },
            { name: "action", label: "Actions", align: "center" },
        ],
        rows:data==null?[]: data.map((audit) => ({
            // refObjectId: (
            //     <ArgonTypography px={4} variant="caption" color="secondary" fontWeight="medium">
            //         {audit.refObjectId}
            //     </ArgonTypography>
            // ),
            sourceName: (
                <ArgonTypography px={4} variant="caption" color="secondary" fontWeight="medium">
                    {audit.sourceReference && audit.sourceReference.sourceReferenceName}
                </ArgonTypography>
            ),
            sourceKey: (
                <ArgonTypography px={4} variant="caption" color="secondary" fontWeight="medium">
                    {audit.sourceReference && audit.sourceReference.sourceReferenceKey}
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
