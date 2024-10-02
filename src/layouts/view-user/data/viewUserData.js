import ArgonTypography from "../../../components/ArgonTypography";

// This function will now directly use the data fetched from the API
export function viewUserTableData(data) {
    return {
        filterInitialValue: {  // Fixed spelling from 'filterIntialValue' to 'filterInitialValue'
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
        rows: !data ? [] : data.map((user) => ({  // Use the provided data instead of testdata
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
                    {new Date(user.eventOccurence).toLocaleString()}
                </ArgonTypography>
            ),
            item: user
        }))
    };
};