import ArgonTypography from "../../../components/ArgonTypography";

var dummyData =[
    {id:1,objectName:"Product",refernceKey:"workingno1"},
    {id:3,objectName:"Product",refernceKey:"workingno2"},
    {id:3,objectName:"Product",refernceKey:"workingno3"},
    {id:4,objectName:"Season",refernceKey:"20201"},
    {id:5,objectName:"Season",refernceKey:"20202"},
    {id:6,objectName:"Season",refernceKey:"20203"}
]
export function viewSourceReferenceData(data=dummyData) {
   
    return {
        filterIntialValue : {
            sort: {},
            filter: {}
        },
        columns: [
            { name: "objectName", label: "Object Name", align: "left" },
            { name: "refernceKey", label: "Reference key", align: "left" },
            { name: "action", label: "Actions", align: "center" },
        ],
        rows:data==null?[]: data.map((object) => ({
            objectName: (
                <ArgonTypography px={4} variant="caption" color="secondary" fontWeight="medium">
                    {object.objectName}
                </ArgonTypography>
            ),
            refernceKey: (
                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                    {object.refernceKey}
                </ArgonTypography>
            ),
            item:object
        }))
    };
}
