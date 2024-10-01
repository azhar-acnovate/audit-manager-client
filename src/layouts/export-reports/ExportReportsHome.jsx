import React from "react"
import DashboardNavbar from "../dashboard/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import ArgonBox from "../../components/ArgonBox";
import ArgonTypography from "../../components/ArgonTypography";
import { Box, Card, Button, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import pxToRem from "../../assets/theme/functions/pxToRem";
import ReportListModel from "./components/ReportListModel";
import ArgonButton from "../../components/ArgonButton";
import typography from "../../assets/theme/base/typography";
const StyledCard = styled(({ ...props }) => (
    <Card {...props}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {props.children}
        </Box>
    </Card>
))(({ theme }) => ({
    width: '20vw',
    height: '13vw',
    transition: '0.3s ease-in-out',
    padding: '20px',
    textAlign: 'center',
    marginBottom: '20px',
    boxShadow: theme.shadows[3], // Elevation level 3 shadow
    '&:hover': {
        boxShadow: theme.shadows[6], // Increase shadow on hover
    },
}));
const ExportReportsHome = (props) => {
    const [open, setOpen] = React.useState(false);
    const [selectedReports, setSelectedReports] = React.useState([]);
    const handleClickListItem = () => {
        setOpen(true);
    };
    const isReportSelected = () => selectedReports.length > 0;
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <ArgonBox py={3}>
                <ArgonBox mb={3}>


                    {/* <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={2} > */}
                    {/* Card container */}
                    <Card sx={{ padding: "20px" }}>
                        {/* Steps to export audits section */}
                        <ArgonTypography variant="h6" gutterBottom>
                            Steps to export Audits:
                        </ArgonTypography>
                        <ArgonTypography fontSize={typography.size.lg}>
                            1. Select single or multiple lists, from which you wish to export audits.
                        </ArgonTypography>
                        <ArgonTypography fontSize={typography.size.lg}>
                            2. Export the audits as an .XLS file or as a .CSV file.
                        </ArgonTypography>

                        {/* Step cards container */}
                        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                            {/* Select List Step */}
                            <Grid item xs={12} md={4}>
                                <StyledCard key={"export-audit-1"}>
                                    <ArgonTypography variant="h6">1. Select List</ArgonTypography>
                                    <ArgonTypography fontSize={pxToRem(15)} color="text.secondary">
                                        Selected List & Audit Count will be displayed here
                                    </ArgonTypography>

                                    <ArgonButton onClick={handleClickListItem} variant="contained" color="primary" sx={{ marginTop: "10px" }}>
                                        Click to Select List(s)
                                    </ArgonButton>
                                    <ReportListModel
                                        id="Report List Model"
                                        keepMounted
                                        useOpen={[open, setOpen]}
                                        value={[selectedReports, setSelectedReports]}
                                    />
                                </StyledCard>
                            </Grid>

                            {/* Export as XLS */}
                            <Grid item xs={12} md={4}>
                                <StyledCard key={"export-audit-1"}>
                                    <ArgonTypography variant="h6">2. Export as .XLS file</ArgonTypography>
                                    <ArgonTypography fontSize={pxToRem(15)} color="text.secondary">
                                        To filter, analyze, and create reports
                                    </ArgonTypography>
                                    <Tooltip title={!isReportSelected() ? "Please choose report" : ""}>
                                        <div>
                                            <ArgonButton fullWidth disabled={!isReportSelected()} variant="contained" color="info" sx={{ marginTop: "10px" }}>
                                                Export Audits
                                            </ArgonButton>
                                        </div>
                                    </Tooltip>
                                </StyledCard>
                            </Grid>

                            {/* Export as CSV */}
                            <Grid item xs={12} md={4}>
                                <StyledCard>
                                    <ArgonTypography variant="h6">2. Export as .CSV file</ArgonTypography>
                                    <ArgonTypography fontSize={pxToRem(15)} pb={3} color="text.secondary">
                                        To get a data backup
                                    </ArgonTypography>
                                    <Tooltip title={!isReportSelected() ? "Please choose report" : ""}>
                                        <div>
                                            <ArgonButton fullWidth disabled={!isReportSelected()} variant="contained" color="info" sx={{ marginTop: "10px" }}>
                                                Export Audits
                                            </ArgonButton>
                                        </div>
                                    </Tooltip>
                                </StyledCard>
                            </Grid>

                        </Grid>
                    </Card>
                    {/* </ArgonBox> */}

                </ArgonBox>
            </ArgonBox>
        </DashboardLayout>
    )
};

export default ExportReportsHome;
