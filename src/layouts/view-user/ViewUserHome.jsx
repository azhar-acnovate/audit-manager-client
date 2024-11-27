import React from "react"
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import ArgonBox from "../../components/ArgonBox";
import { Card } from "@mui/material";
import ArgonTypography from "../../components/ArgonTypography";
import { viewUserTableData } from "./data/viewUserData";
import ViewUserTable from "./components/ViewUserTable";
import UserService from "../../rest-services/UserService";
import ViewUserTableSkeleton from "./components/ViewUserTableSkeleton";
import ArgonButton from "../../components/ArgonButton";
import { Link } from "react-router-dom";
import FadeInComponent from "../../components/FadeInComponent";
import RoleBasedComponent from "../../components/RoleBasedComponent";
import Error403 from "../authentication/Error403";

const ViewUserHome = (props) => {
    const [response, setResponse] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const { columns, rows } = viewUserTableData(response != null ? response.data.content : []);
    const [pageNo, setPageNo] = React.useState(1)
    // const [filter, setFilter] = React.useState(filterIntialValue);
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await UserService.findPagable(pageNo)
                setResponse(response)
            } catch (e) {

            } finally {
                setLoading(false);
            }
        }
        fetchData()
    }, [pageNo])
    return (
        <RoleBasedComponent allowedRoles={"admin"} replace={<Error403 />}>
            <DashboardLayout>
                <DashboardNavbar />
                <ArgonBox py={3}>
                    <ArgonBox mb={3}>
                        <Card>
                            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={2} >
                                <ArgonTypography variant="h6">User View</ArgonTypography>
                                <ArgonButton component={Link} to={"./create"} color={"info"}>Create</ArgonButton>
                            </ArgonBox>
                            <ArgonBox
                                sx={{
                                    "& .MuiTableRow-root:not(:last-child)": {
                                        "& td": {
                                            borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                                `${borderWidth[1]} solid ${borderColor}`,
                                        },
                                    },
                                }}
                            >
                                <FadeInComponent
                                    visible={loading}
                                    child={<ViewUserTableSkeleton columns={columns} />}
                                    replacement={<div>
                                        <ViewUserTable columns={columns} rows={rows} data={response && response.data} setPageNo={setPageNo} />
                                    </div>}
                                />
                            </ArgonBox>
                        </Card>
                    </ArgonBox>
                </ArgonBox>
            </DashboardLayout>
        </RoleBasedComponent>
        
    )
};

export default ViewUserHome;
