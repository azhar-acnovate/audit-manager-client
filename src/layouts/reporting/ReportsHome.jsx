import React from "react"
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout"
import DashboardNavbar from "../dashboard/DashboardNavbar";
import ArgonBox from "../../components/ArgonBox";
import { Card } from "@mui/material";
import ArgonTypography from "../../components/ArgonTypography";
import ArgonButton from "../../components/ArgonButton";
import { Link } from "react-router-dom";
import ReportOverviewTable from "./components/ReportOverviewTable";
import { viewReportsTableData } from "./data/viewReportsData";
import AuditReportServiceAPI from "../../rest-services/audit-report-service";
import FadeInComponent from "../../components/FadeInComponent";
import ViewAuditTableSkeleton from "../view-audit/components/ViewAuditTableSkeleton";

const ReportsHome = (props) => {
    const [response, setResponse] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const { columns, rows } = viewReportsTableData(response != null ? response.data.content : []);
    const [pageNo, setPageNo] = React.useState(1)
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await AuditReportServiceAPI.findPagable(pageNo)
                setResponse(response)
            } catch (e) {

            } finally {
                setLoading(false);
            }
        }
        fetchData()
    }, [pageNo])
    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <ArgonBox py={3}>
                    <ArgonBox mb={3}>
                        <Card>
                            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={2} >
                                <ArgonTypography variant="h6">Report Overview</ArgonTypography>
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
                                    child={<ViewAuditTableSkeleton columns={columns} />}
                                    replacement={<div>
                                        <ReportOverviewTable columns={columns} rows={rows} data={response && response.data} setPageNo={setPageNo}></ReportOverviewTable>
                                    </div>}>
                                </FadeInComponent>
                            </ArgonBox>
                        </Card>
                    </ArgonBox>
                </ArgonBox>
            </DashboardLayout>
        </>
    )
};

export default ReportsHome;
