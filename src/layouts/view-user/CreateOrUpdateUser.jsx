import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import ArgonBox from "../../components/ArgonBox";
import { Card, Grid } from "@mui/material";
import ArgonTypography from "../../components/ArgonTypography";
import ArgonButton from "../../components/ArgonButton";
import UserCreationInputField from "./components/UserCreationInputField";
import useValidation from "../../hooks/GlobalValidationHook";
import { initialTempAttributeData, roleOptions } from "./data/createOrUpdate";
import UserService from "../../rest-services/UserService";
import { useToast } from "../../components/toast/Toast";
import SimpleBackdrop from "../../components/SimpleBackDrop";
import { useDecodedId } from "../../hooks/useDecodedData";
import BackButton from "../../components/BackButton";

const CreateOrUpdateUser = () => {
  let decodedId = useDecodedId(); 
  const [loading, setLoading] = useState(false);
  const [userCreationData, setUserCreationData] = useState(initialTempAttributeData);
  const [isResetPassword, setIsResetPassword] = useState(false); 
  const userCreationValidator = useValidation(userCreationData, setUserCreationData);

  const navigate = useNavigate();
  const {showErrorToast,toastWithCommonResponse } = useToast();

  // Fetch existing user data if in edit mode
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (decodedId) {
          const res = await UserService.findOne(decodedId);
        

          // Adjust the field mappings based on the API response
          if (res && res.data) {
            setUserCreationData({
              id: res.data.id,
              fullName: res.data.fullName,
              email: res.data.userEmail || "",
              userName: res.data.userName,
              role: res.data.userRole || "",
              password: "",
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

    if (decodedId && decodedId !== "") {
      fetchData();
    }
  }, [decodedId, showErrorToast]);

  const isEditMode = () => !!decodedId;

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    if (await userCreationValidator.validateForm()) {
      if (isEditMode() && isResetPassword) {
        if (userCreationData.password !== userCreationData.confirmPassword) {
          showErrorToast("Passwords do not match!");
          return;
        }
      }
      setLoading(true);
      try {
        if (isEditMode()) {
          if (!userCreationData.id) {
            throw new Error("User ID is missing for update.");
          }

          // Prepare data for the update
          const updateUserPayload = {
            id: userCreationData.id,
            fullName: userCreationData.fullName,
            userName: userCreationData.userName,
            userEmail: userCreationData.email,
            userRole: userCreationData.role,
            isResetPassword, 
            password: isResetPassword ? userCreationData.password : undefined, 
          };
         
          // Update user
          const res = await UserService.updateUser(updateUserPayload);
          // if (res.error === false) {
          //   showSuccessToast("User updated successfully!");
          // } else {
          //   showErrorToast("User not updated successfully!");
          // }
          toastWithCommonResponse(res)

        } else {
          // Create user
          const createUserPayload = {
            fullName: userCreationData.fullName,
            userName: userCreationData.userName,
            userEmail: userCreationData.email,
            userRole: userCreationData.role,
            // password: userCreationData.password,
          };
          const res =   await UserService.createUser(createUserPayload);
         // showSuccessToast("User created successfully!");
         toastWithCommonResponse(res)
        }
      } catch (error) {
        console.error("Update Error: ", error);
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

  const handleInputChange = (fieldName, value) => {
    setUserCreationData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setIsResetPassword(event.target.checked);
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
                  <ArgonTypography variant="h6">
                    {isEditMode() ? "Edit User" : "Add User"}
                  </ArgonTypography>
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
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  validator={userCreationValidator}
                />
                <UserCreationInputField
                  placeholder="Email"
                  fieldName="email"
                  type="email"
                  value={userCreationData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  validator={userCreationValidator}
                />
                <UserCreationInputField
                  placeholder="Username"
                  fieldName="userName"
                  value={userCreationData.userName}
                  onChange={(e) => handleInputChange("userName", e.target.value)}
                  validator={userCreationValidator}
                />
                <UserCreationInputField
                  placeholder="Role"
                  fieldName="role"
                  type="select"
                  value={userCreationData.role}
                  onChange={handleRoleChange}
                  options={roleOptions}
                  validator={userCreationValidator}
                />

                {/* Show reset password checkbox only in edit mode */}
                {isEditMode() && (
                  <>
                    <Grid item xs={12}>
                      <label>
                        <input
                          type="checkbox"
                          checked={isResetPassword}
                          onChange={handleCheckboxChange}
                        />
                    <ArgonTypography variant="body1" color="textSecondary"> 
                      Reset Password
                   </ArgonTypography>
                      </label>
                    </Grid>

                    {isResetPassword && (
                      <>
                        <UserCreationInputField
                          placeholder="New Password"
                          fieldName="password"
                          type="password"
                          value={userCreationData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
                          validator={userCreationValidator}
                        />
                        <UserCreationInputField
                          placeholder="Confirm Password"
                          fieldName="confirmPassword"
                          type="password"
                          value={userCreationData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          validator={userCreationValidator}
                        />
                      </>
                    )}
                  </>
                )}

                {/* Buttons */}
                <Grid container justifyContent="flex-end" spacing={3} mt={3}>
                  <Grid item>
                  <ArgonButton 
                    onClick={handleSubmit} 
                    color="success" 
                    sx={{ minWidth: "130px" }} 
                    id={isEditMode() ? "updatebtn" : "submitbtn"}
                  >
                     {isEditMode() ? "Update" : "Submit"}
                  </ArgonButton>
                  </Grid>
                  <Grid item>
                    <ArgonButton onClick={handleCancel} color="error" sx={{ minWidth: "130px" }}>
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
