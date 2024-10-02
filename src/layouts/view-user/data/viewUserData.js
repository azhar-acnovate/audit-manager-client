import ArgonTypography from "../../../components/ArgonTypography";

// var testdata = [
//     {
//         "id": 1,
//         "userName": "test",
//         "email": "test@example.com",
//         "role": "Admin",
//         "defaultPassword": "admin@123",
//         "status": "Active",
//         "eventOccurence": "2024-09-09T10:00:00Z",
//     },
//     {
//         "id": 2,
//         "userName": "superuser",
//         "email": "superadmin@example.com",
//         "role": "Super Admin",
//         "defaultPassword": "admin@1234",
//         "status": "Active",
//         "eventOccurence": "2024-09-09T11:00:00Z",
//     },
//     {
//         "id": 3,
//         "userName": "testuser",
//         "email": "testuser@example.com",
//         "role": "User",
//         "defaultPassword": "user@003",
//         "status": "Active",
//         "eventOccurence": "2024-09-08T15:30:00Z",
//     },
//     {
//         "id": 4,
//         "userName": "user1",
//         "email": "user1@example.com",
//         "role": "User",
//         "defaultPassword": "user@004",
//         "status": "Active",
//         "eventOccurence": "2024-09-07T09:45:00Z",
//     },
//     {
//         "id": 5,
//         "userName": "user2",
//         "email": "user2@example.com",
//         "role": "User",
//         "defaultPassword": "user@005",
//         "status": "Active",
//         "eventOccurence": "2024-09-06T12:15:00Z",
//     }
// ];


export function viewUserTableData(data) {
    return {
        filterIntialValue: {
            sort: {},
            filter: {}
        },
        columns: [
            { name: "userName", label: "User Name", align: "center" },
            { name: "email", label: "Email", align: "center" }, 
            { name: "role", label: "Role", align: "center" },
            { name: "defaultPassword", label: "Default Password", align: "center" },
            { name: "status", label: "Status", align: "center" },
            { name: "created_at", label: "Created", align: "center" },
            { name: "action", label: "Actions", align: "center" },
        ],
        rows: data == null ? [] : data.map((user) => ({
            userName: (
                <ArgonTypography px={4} variant="caption" color="secondary" fontWeight="medium">
                    {user.userName}
                </ArgonTypography>
            ),
            email: (
                <ArgonTypography px={4} variant="caption" color="secondary" fontWeight="medium">
                    {user.email}
                </ArgonTypography>
            ),
            role: (
                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                    {user.role}
                </ArgonTypography>
            ),
            defaultPassword: ( 
                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                    {user.defaultPassword}
                </ArgonTypography>
            ),
            status: (
                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                    {user.status}
                </ArgonTypography>
            ),
            created_at: (
                <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                    {user.eventOccurence}
                </ArgonTypography>
            ),
            item: user
        }))
    };
}