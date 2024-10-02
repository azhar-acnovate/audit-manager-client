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
import UserService from "../../rest-services/UserService";
import { useToast } from "../../components/toast/Toast";
import SimpleBackdrop from "../../components/SimpleBackDrop";
import { useDecodedId } from "../../hooks/useDecodedData";
import BackButton from "../../components/BackButton";

const CreateOrUpdateUser = () => {
  let decodedId = useDecodedId(); // This will have the userId when updating
  const [loading, setLoading] = React.useState(false);
  const [userCreationData, setUserCreationData] = React.useState(initialTempAttributeData);
  const userCreationValidator = useValidation(userCreationData, setUserCreationData);

  const navigate = useNavigate();

  const { showSuccessToast, showErrorToast } = useToast();

  // Fetch existing user data if in edit mode
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (decodedId) {
          const res = await UserService.findOne(decodedId); // Assuming this method exists
          if (res) {
            setUserCreationData({
              ...userCreationData,
              fullName: res.fullName,
              email: res.email,
              userName: res.userName,
              role: res.role,
              password: "", // Do not pre-fill the password for security reasons
              confirmPassword: "",
            });
          }
        }
      } catch (error) {
        showErrorToast("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    if (decodedId) {
      fetchData();
    }
  }, [decodedId, showErrorToast]);

  const isEditMode = () => !!decodedId; // Check if the component is in edit mode

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleSubmit = async () => {
    if (await userCreationValidator.validateForm()) {
      setLoading(true);
      try {
        if (isEditMode()) {
          // Update user
          const response = await UserService.updateUser(decodedId, userCreationData);
          showSuccessToast("User updated successfully!");
        } else {
          // Create user
          const response = await UserService.createUser(userCreationData);
          showSuccessToast("User created successfully!");
        }
        navigate("/users"); // Redirect after success (assuming users listing page)
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
                    <ArgonButton onClick={handleSubmit} color="success" sx={{ minWidth: '130px' }}>
                      {isEditMode() ? "Update" : "Submit"}
                    </ArgonButton>
                  </Grid>
                  <Grid item>
                    <ArgonButton onClick={handleCancel} color="error" sx={{ minWidth: '130px' }}>
                      Cancel
                    </ArgonButton>
                  </Grid>
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
