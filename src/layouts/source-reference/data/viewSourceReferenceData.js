import ArgonTypography from "../../../components/ArgonTypography";


export function viewSourceReferenceData(data) {
   
    return {
        filterIntialValue : {
            sort: {},
            filter: {}
        },
        columns: [
            { name: "sourceReferenceName", label: "Object Name", align: "left" },
            { name: "soruceReferenceKey", label: "Reference key", align: "left" },
            { name: "action", label: "Actions", align: "center" },
        ],
        rows:data==null?[]: data.map((object) => ({
            sourceReferenceName: (
                <ArgonTypography px={4} variant="caption" color="secondary" fontWeight="medium">
                    {object.sourceReferenceName}
                </ArgonTypography>
            ),
            soruceReferenceKey: (
                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                    {object.sourceReferenceKey}
                </ArgonTypography>
            ),
            item:object
        }))
    };
}
