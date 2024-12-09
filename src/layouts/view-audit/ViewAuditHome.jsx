import React from "react"
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import ArgonBox from "../../components/ArgonBox";
import { Card, Grid } from "@mui/material";
import ArgonTypography from "../../components/ArgonTypography";
import { viewAuditTableData } from "./data/viewAuditData";
import ViewAuditTable from "./components/ViewAuditTable";
import AuditObjectChangeTrackerServiceAPI from "../../rest-services/audit-object-change-tracker-service";
import ViewAuditTableSkeleton from "./components/ViewAuditTableSkeleton";
import ArgonButton from "../../components/ArgonButton";
import { Link } from "react-router-dom";
import FadeInComponent from "../../components/FadeInComponent";
import SourceReferenceAutocomplete from "../../components/SourceReferenceAutocomplete";

const ViewAuditHome = (props) => {
    const [response, setResponse] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const { columns, rows } = viewAuditTableData(response != null ? response.data.content : []);
    const [pageNo, setPageNo] = React.useState(1)
    const [sourceReferenceValue, setSourceReferenceValue] = React.useState(0)
    // const [filter, setFilter] = React.useState(filterIntialValue);
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await AuditObjectChangeTrackerServiceAPI.findPagable(pageNo, sourceReferenceValue)
                setResponse(response)
            } catch (e) {

            } finally {
                setLoading(false);
            }
        }
        fetchData()
    }, [pageNo, sourceReferenceValue])
    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
                <ArgonBox py={3}>
                    <ArgonBox mb={3}>
                        <Card>
                            <Grid container p={2} spacing={3} direction="row" sx={{ justifyContent: "space-between", alignItems: "center", alignContent: "center" }}>
                                <Grid item xs={2} sm={4} md={6} >
                                    <ArgonTypography variant="h6">Audit View</ArgonTypography>
                                </Grid>
                                <Grid item sx={{ mt: 2 }} xs={2} sm={4} md={4} >

                                    <SourceReferenceAutocomplete
                                        onClear={() => { setSourceReferenceValue(0)}}
                                        defaultValue={sourceReferenceValue}

                                        onChange={(value) => {
                                            if (value && value.id) {
                                                setSourceReferenceValue(value.id)

                                            }

                                        }}
                                    />

                                </Grid>
                                <Grid item xs={2} sm={4} md={2} >
                                    <ArgonButton component={Link} to={"./create"} color={"info"}>Create</ArgonButton>
                                </Grid>
                            </Grid>
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
                                        <ViewAuditTable columns={columns} rows={rows} data={response && response.data} setPageNo={setPageNo} />
                                    </div>}
                                />
                            </ArgonBox>
                        </Card>
                    </ArgonBox>
                </ArgonBox>
            </DashboardLayout>
        </>
    )
};

export default ViewAuditHome;
