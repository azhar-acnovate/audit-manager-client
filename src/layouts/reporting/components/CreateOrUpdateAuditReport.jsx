import React from "react"
import { useDecodedId } from "../../../hooks/useDecodedData";
import { initialAuditReportData } from "../data/createOrUpdateData";
import AuditReportServiceAPI from "../../../rest-services/audit-report-service";
import { useToast } from "../../../components/toast/Toast";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../dashboard/DashboardNavbar";
import SimpleBackdrop from "../../../components/SimpleBackDrop";
import ArgonBox from "../../../components/ArgonBox";
import { Card, Grid } from "@mui/material";
import ArgonTypography from "../../../components/ArgonTypography";
import ArgonButton from "../../../components/ArgonButton";
import BackButton from "../../../components/BackButton";
import useValidation from "../../../hooks/GlobalValidationHook";
import AuditReportInputField from "./AuditReportInputField";
import { DateFormatter, eventOccurenceDateFormat } from "../../../utils/DateFormatter";
import CustomDatepicker from "../../view-audit/components/CustomDatePicker";
import CustomLabel from "./CustomLabel";

const CreateOrUpdateAuditReport = (props) => {
  let decodedId = useDecodedId()
  const [loading, setloading] = React.useState(false)
  const [auditReportData, setAuditReportData] = React.useState(initialAuditReportData);
  const auditReportValidator = useValidation(auditReportData, setAuditReportData);
  React.useEffect(() => {
    const fetchData = async () => {
      setloading(true)
      var res = await AuditReportServiceAPI.findOne(decodedId)
      if (res.status === 200) {
        setAuditReportData((prevData) => ({
          ...prevData,
          id:res.data.id,
          refObjectId:res.data.refObjectId,
          reportName:res.data.reportName,
          startDateRange:res.data.startDateRange,
          endDateRange:res.data.endDateRange,
          changedUserNames:res.data.changedUserNames.toString()

        }))

      }
      setloading(false)
    }
    if (decodedId != null) {
      fetchData()
    }

  }, [decodedId])
  const { toastWithCommonResponse } = useToast()
  const isCreated = () => {
    return decodedId !== null;
  }
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SimpleBackdrop loading={loading} />
        <ArgonBox py={3}>
          <ArgonBox mb={3} >
            <Card>
              <ArgonBox p={2}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <ArgonTypography variant="h6">{(decodedId != null ? "Update" : "Add") + " Reports"}</ArgonTypography>
                  </Grid>
                  <Grid item xs={4} container spacing={2} justifyContent="flex-end">
                    <Grid item>
                      <BackButton></BackButton>
                    </Grid>
                    <Grid item>
                      <ArgonButton onClick={async () => {
                          if (await auditReportValidator.validateForm()) {
                        
                            setloading(true)
                            auditReportData.changedUserNames = auditReportData.changedUserNames.split(',')
                            var response = await AuditReportServiceAPI.create(auditReportData);
                            setloading(false)
                            if (response.status === 200) {
                              auditReportValidator.handleChange("id", response.data.id);
                  
                            }
                            toastWithCommonResponse(response)
                        }
                      }}
                        sx={{ width: 30 }}
                        color={"success"}>{isCreated() ? "Update" : "Save"}</ArgonButton>
                    </Grid>
                  </Grid>
                </Grid>
              </ArgonBox>
              <ArgonBox
                px={4}
                sx={{
                  // height: '400px', // Set your desired height here
                  "& .MuiTableRow-root:not(:last-child)": {
                    "& td": {
                      borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,
                    },
                  },
                }}
              >
                <Grid container
                  spacing={3}
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "start",
                  }}>
                  <Grid item xs={2} sm={4} md={6} >


                    <AuditReportInputField
                      placeholder={"Report Name"}
                      value={auditReportData.reportName}
                      fieldName={"reportName"}
                      validator={auditReportValidator}
                    /> </Grid>
                  <Grid item xs={2} sm={4} md={6} >


                    <AuditReportInputField
                      placeholder={"Ref Object Id"}
                      value={auditReportData.refObjectId}
                      fieldName={"refObjectId"}
                      validator={auditReportValidator}
                    />
                  </Grid>
                  <Grid item xs={2} sm={4} md={6} >
                    <ArgonBox mb={2}>
                      <CustomLabel>Start Date</CustomLabel>
                      <CustomDatepicker
                        marginLeft="200"
                        defaultValue={auditReportData.startDateRange}
                        onChange={(newDate) => {

                          auditReportValidator.handleChange("startDateRange", DateFormatter.dateToString(newDate, eventOccurenceDateFormat))
                        }}></CustomDatepicker>
                    </ArgonBox>
                  </Grid>
                  <Grid item xs={2} sm={4} md={6} >
                    <ArgonBox mb={2}>
                      <CustomLabel>End Date</CustomLabel>
                      <CustomDatepicker
                        marginLeft="200"
                        defaultValue={auditReportData.endDateRange}
                        onChange={(newDate) => {

                          auditReportValidator.handleChange("endDateRange", DateFormatter.dateToString(newDate, eventOccurenceDateFormat))
                        }}></CustomDatepicker>
                    </ArgonBox>
                  </Grid>
                  <Grid item xs={2} sm={4} md={12} >


                    <AuditReportInputField
                      placeholder={"Changed Users"}
                      value={auditReportData.changedUserNames}
                      fieldName={"changedUserNames"}
                      validator={auditReportValidator}
                    /> </Grid>
                </Grid>

              </ArgonBox>
            </Card>
          </ArgonBox>
        </ArgonBox>
      </DashboardLayout>
    </>
  )
};

export default CreateOrUpdateAuditReport;
