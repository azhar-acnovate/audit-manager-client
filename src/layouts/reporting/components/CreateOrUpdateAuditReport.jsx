import React from "react";
import { useDecodedId } from "../../../hooks/useDecodedData";
import { initialAuditReportData } from "../data/createOrUpdateData";
import AuditReportServiceAPI from "../../../rest-services/audit-report-service";
import { useToast } from "../../../components/toast/Toast";
import DashboardLayout from "../../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../dashboard/DashboardNavbar";
import SimpleBackdrop from "../../../components/SimpleBackDrop";
import ArgonBox from "../../../components/ArgonBox";
import { Card, Grid, TextField } from "@mui/material";
import ArgonTypography from "../../../components/ArgonTypography";
import ArgonButton from "../../../components/ArgonButton";
import BackButton from "../../../components/BackButton";
import AuditReportInputField from "./AuditReportInputField";
import { DateFormatter, eventOccurenceDateFormat, reportDateFormat } from "../../../utils/DateFormatter";
import CustomDatepicker from "../../view-audit/components/CustomDatePicker";
import CustomLabel from "./CustomLabel";
import SourceReferenceAutocomplete from "../../../components/SourceReferenceAutocomplete";
import moment from "moment";
import { auditReportValidation } from "../data/auditReportValidation";

const CreateOrUpdateAuditReport = (props) => {
  let decodedId = useDecodedId();
  const [loading, setLoading] = React.useState(false);
  const [auditReportData, setAuditReportData] = React.useState(initialAuditReportData);
  const [errors, setErrors] = React.useState({});
  const { toastWithCommonResponse } = useToast();

  // Fetch data if updating an existing report
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await AuditReportServiceAPI.findOne(decodedId);
      if (res.status === 200) {
        setAuditReportData((prevData) => ({
          ...prevData,
          id: res.data.id,
          refObjectIds: res.data.refObjectIds,
          reportName: res.data.reportName,
          startDateRange: res.data.startDateRange ? DateFormatter.dateToString(res.data.startDateRange, reportDateFormat) : DateFormatter.dateToString(moment(), reportDateFormat),
          endDateRange: res.data.endDateRange ? DateFormatter.dateToString(res.data.endDateRange, reportDateFormat) : DateFormatter.dateToString(moment(), reportDateFormat),
          changedUserNames: Array.isArray(res.data.changedUserNames)
            ? res.data.changedUserNames.join(",")
            : (typeof res.data.changedUserNames === "string" && res.data.changedUserNames.includes(","))
              ? res.data.changedUserNames.split(",")
              : res.data.changedUserNames,
        }));
      }
      setLoading(false);
    };

    if (decodedId != null) {
      fetchData();
    }
  }, [decodedId]);

  // Function to handle form submission
  const handleFormSubmit = async () => {
    const validationErrors = auditReportValidation(auditReportData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);

      // Convert changedUserNames to an array if not already
      if (auditReportData.changedUserNames) {
        if (!Array.isArray(auditReportData.changedUserNames)) {
          auditReportData.changedUserNames = auditReportData.changedUserNames?.toString().split(",");
        }
      }

      const response = await AuditReportServiceAPI.create(auditReportData);
      setLoading(false);

      if (response.status === 200) {
        // Save ID if successful
        setAuditReportData((prevData) => ({
          ...prevData,
          id: response.data.id,
        }));
      }

      toastWithCommonResponse(response);
    } else {
      console.log("Validation failed. Please check your input.");
    }
  };

  const isCreated = () => {
    return decodedId !== null;
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SimpleBackdrop loading={loading} />
        <ArgonBox py={3}>
          <ArgonBox mb={3}>
            <Card>
              <ArgonBox p={2}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={8}>
                    <ArgonTypography variant="h6">
                      {(decodedId != null ? "Update" : "Add") + " Reports"}
                    </ArgonTypography>
                  </Grid>
                  <Grid item xs={4} container spacing={2} justifyContent="flex-end">
                    <Grid item>
                      <BackButton />
                    </Grid>
                    <Grid item>
                      <ArgonButton onClick={handleFormSubmit} sx={{ width: 30 }} color={"success"}>
                        {isCreated() ? "Update" : "Save"}
                      </ArgonButton>
                    </Grid>
                  </Grid>
                </Grid>
              </ArgonBox>
              <ArgonBox px={4}>
                <Grid container spacing={3} direction="row" sx={{ justifyContent: "space-between", alignItems: "start" }}>
                  <Grid item xs={12}>
                    <AuditReportInputField
                      placeholder={"Report Name"}
                      value={auditReportData.reportName}
                      fieldName={"reportName"}
                      error={Boolean(errors.reportName)}
                      helperText={errors.reportName}
                      onChange={(value) => setAuditReportData((prevData) => ({ ...prevData, reportName: value }))} />
                  </Grid>

                  <Grid item xs={12}>
                    <CustomLabel>{"Source Reference"}</CustomLabel>
                    <SourceReferenceAutocomplete
                      multiple={true}
                      defaultValue={auditReportData.refObjectIds}
                      helperText={errors.refObjectIds}
                      error={Boolean(errors.refObjectIds)}
                      onChange={(value) => {
                        if (value) {
                          let ids = value.map((item) => item.id);
                          setAuditReportData((prevData) => ({
                            ...prevData,
                            refObjectIds: ids,
                          }));
                        }
                      }} />
                  </Grid>

                  <Grid item xs={6}>
                    <ArgonBox mb={2}>
                      <CustomLabel>Start Date</CustomLabel>
                      <CustomDatepicker
                        defaultValue={auditReportData.startDateRange}
                        onChange={(newDate) => {
                          setAuditReportData((prevData) => ({
                            ...prevData,
                            startDateRange: newDate
                              ? DateFormatter.dateToString(newDate, eventOccurenceDateFormat)
                              : "", // Set to empty string if no date is selected
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={!!errors.startDateRange}  // Show error if validation fails
                            helperText={errors.startDateRange}  // Display error message
                          />
                        )} />
                    </ArgonBox>
                  </Grid>

                  <Grid item xs={6}>
                    <ArgonBox mb={2}>
                      <CustomLabel>End Date</CustomLabel>
                      <CustomDatepicker
                        defaultValue={auditReportData.endDateRange}
                        onChange={(newDate) => {
                          setAuditReportData((prevData) => ({
                            ...prevData,
                            endDateRange: newDate
                              ? DateFormatter.dateToString(newDate, eventOccurenceDateFormat)
                              : "", // Set to empty string if no date is selected
                          }));
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={!!errors.endDateRange}  // Show error if validation fails
                            helperText={errors.endDateRange}  // Display error message
                          />
                        )} />
                    </ArgonBox>
                  </Grid>

                  <Grid item xs={12}>
                    <AuditReportInputField
                      placeholder={"Changed Users"}
                      value={auditReportData.changedUserNames}
                      fieldName={"changedUserNames"}
                      error={Boolean(errors.changedUserNames)}
                      helperText={errors.changedUserNames}
                      onChange={(value) => setAuditReportData((prevData) => ({ ...prevData, changedUserNames: value }))} />
                  </Grid>
                </Grid>
              </ArgonBox>
            </Card>
          </ArgonBox>
        </ArgonBox>
      </DashboardLayout>
    </>
  );
};

export default CreateOrUpdateAuditReport;
