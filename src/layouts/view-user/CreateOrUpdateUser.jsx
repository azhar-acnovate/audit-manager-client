import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import ArgonBox from "../../components/ArgonBox";
import { Card, Grid } from "@mui/material";
import ArgonTypography from "../../components/ArgonTypography";
import ArgonButton from "../../components/ArgonButton";
import UserCreationInputField from "./components/UserCreationInputField";
import useValidation from "../../hooks/GlobalValidationHook";
import { initialTempAttributeData } from "./data/createOrUpdate";
// import AuditObjectChangeTrackerServiceAPI from "../../rest-services/audit-object-change-tracker-service"; // Commented the import
import UserService from "../../rest-services/UserService";
import { useToast } from "../../components/toast/Toast";
import SimpleBackdrop from "../../components/SimpleBackDrop";
import { useDecodedId } from "../../hooks/useDecodedData";
import BackButton from "../../components/BackButton";

const CreateOrUpdateUser = () => {
  let decodedId = useDecodedId();
  const [loading, setLoading] = React.useState(false);
  const [userCreationData, setUserCreationData] = React.useState(initialTempAttributeData);
  const userCreationValidator = useValidation(userCreationData, setUserCreationData);

  const navigate = useNavigate(); // useNavigate hook for navigation

  // Get toast functions from the context
  const { showSuccessToast, showErrorToast } = useToast();

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        /*
        var res = await AuditObjectChangeTrackerServiceAPI.findOne(decodedId);
        if (res.status === 200) {
          setUserCreationData((prevData) => ({
            ...prevData,
            id: res.data.id,
            refObjectId: res.data.refObjectId,
            eventType: res.data.eventType,
            eventOccurence: res.data.eventOccurence,
          }));
        }
        */
      } catch (error) {
        showErrorToast("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (decodedId != null) {
      fetchData();
    }
  }, [decodedId, showErrorToast]);

  const isEditMode = () => {
    // Check if the URL contains "update" to determine if we're in edit mode
    const currentUrl = window.location.href;
    return currentUrl.includes("update");
  };

  const handleCancel = () => {
    navigate(-1); // This will navigate the user to the previous page (same as back action)
  };

  const handleSubmit = async () => {
    
    // If form is valid, proceed
    if (await userCreationValidator.validateForm()) {
      setLoading(true);
      try {
        // Simulating a successful form submission
        console.log("Form Data:", userCreationData); // This will log the form data in the browser console
        showSuccessToast(isEditMode() ? "User Updated successfully!" : "User Created successfully!"); // Show success toast
        
        // If this were a real API call, it would be done here.
        
        // var response = isEditMode()
        //   ? await AuditUserCreationServiceAPI.updateAuditUserCreation(userCreationData)
        //   : await AuditObjectChangeTrackerServiceAPI.createAuditUserCreation(userCreationData);

        const response = await UserService.createUser(userCreationData);
        
        // toastWithCommonResponse(response);
       console.log(response);
      } catch (error) {
        showErrorToast("Failed to save user");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRoleChange = (event) => {
    setUserCreationData({
      ...userCreationData,
      role: event.target.value,
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SimpleBackdrop loading={loading} />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox p={2}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <ArgonTypography variant="h6">{isEditMode() ? "Edit User" : "Add User"}</ArgonTypography>
                </Grid>
                <Grid item>
                  <BackButton label="Cancel" />
                </Grid>
              </Grid>
            </ArgonBox>

            {/* Form content */}
            <ArgonBox px={4} py={3}>
              <Grid container spacing={3} direction="row" alignItems="center">
                <UserCreationInputField
                  placeholder="Full Name"
                  fieldName="fullName"
                  value={userCreationData.fullName}
                  validator={userCreationValidator}
                />
                <UserCreationInputField
                  placeholder="Email"
                  fieldName="email"
                  type="email"
                  value={userCreationData.email}
                  validator={userCreationValidator}
                />
                <UserCreationInputField
                  placeholder="Username"
                  fieldName="userName"
                  value={userCreationData.userName}
                  validator={userCreationValidator}
                />
                <UserCreationInputField
                  placeholder="Role"
                  fieldName="role"
                  type="select"
                  value={userCreationData.role}
                  onChange={handleRoleChange}
                  options={[
                    { value: "Admin", label: "Admin" },
                    { value: "User", label: "User" }
                  ]}
                  validator={userCreationValidator}
                />
                <UserCreationInputField
                  placeholder="Password"
                  fieldName="password"
                  type="password"
                  value={userCreationData.password}
                  validator={userCreationValidator}
                />
                <UserCreationInputField
                  placeholder="Confirm Password"
                  fieldName="confirmPassword"
                  type="password"
                  value={userCreationData.confirmPassword}
                  validator={userCreationValidator}
                />

                {/* Buttons */}
                <Grid container justifyContent="flex-end" spacing={3} mt={3}>
                  <Grid item>
                    <ArgonButton onClick={handleSubmit} color={"success"}  sx={{ minWidth: '130px' }} >
                      {isEditMode() ? "Update" : "Submit"}
                    </ArgonButton>
                  </Grid>
                  <Grid item>
                    <ArgonButton onClick={handleCancel} color="error"  sx={{ minWidth: '130px' }}> 
                      Cancel
                    </ArgonButton>
                  </Grid>
                  {/* <Grid item>
                    <ArgonButton onClick={handleReset} color="warning">
                      Reset
                    </ArgonButton>
                  </Grid> */}
                </Grid>
              </Grid>
            </ArgonBox>
          </Card>
        </ArgonBox>
      </ArgonBox>
    </DashboardLayout>
  );
};

export default CreateOrUpdateUser;