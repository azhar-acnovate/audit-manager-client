import React, { useRef } from "react"
import { useDecodedId } from "../../hooks/useDecodedData";
import { additionalInfoColumns, initialTempAdditionalInfo, initialTempSourceReferenceData } from "./data/createOrUpdateSourceReferenceData";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import SimpleBackdrop from "../../components/SimpleBackDrop";
import ArgonBox from "../../components/ArgonBox";
import { Card, Grid } from "@mui/material";
import ArgonTypography from "../../components/ArgonTypography";
import useValidation from "../../hooks/GlobalValidationHook";
import BackButton from "../../components/BackButton";
import ArgonButton from "../../components/ArgonButton";
import SourceReferenceInputField from "./components/SourceReferenceInputField";
// import DynamicTable from "../../components/DynamicTable";
import SourceReferenceObjectServiceAPI from "../../rest-services/source-reference-object-service";
import { useToast } from "../../components/toast/Toast";
import DynamicTable from "../../components/DynamicTable";

const CreateOrUpdateSourceReference = (props) => {
    const buttonRef = useRef(null); // Create a reference for the button

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            buttonRef.current.focus(); // Focus on the button when Enter is pressed
        }
    };
    let decodedId = useDecodedId()
    const { toastWithCommonResponse } = useToast();
    const [loading, setloading] = React.useState(false)
    const [sourceReferenceData, setSourceReferenceData] = React.useState(initialTempSourceReferenceData);
    const sourceReferenceValidator = useValidation(sourceReferenceData, setSourceReferenceData);
   const [additionalInfoData, setAdditionalInfoData] = React.useState(initialTempAdditionalInfo);
   const additionalInfoValidator = useValidation(additionalInfoData, setAdditionalInfoData);

    const isCreated = () => {
        return sourceReferenceData.id !== null;
    }
    React.useEffect(() => {
        const fetchData = async () => {
            setloading(true)
            var res = await SourceReferenceObjectServiceAPI.findOne(decodedId)
            if (res.status === 200) {
                setSourceReferenceData((prevData) => ({
                    ...prevData,
                    id: res.data.id,
                    sourceReferenceName: res.data.sourceReferenceName,
                    sourceReferenceKey: res.data.sourceReferenceKey,
                    additionalInfo: res.data.additionalInfo,
                }))
            }
            setloading(false)
        }
        if (decodedId != null) {
            fetchData()
        }

    }, [decodedId])

    const saveAdditionalInfo = () => {
        var updatedAdditionalInfo = sourceReferenceData.additionalInfo ?? [];
        // Ensure the index exists before updating
        if (additionalInfoData.index != null) {
            updatedAdditionalInfo = [
                ...updatedAdditionalInfo.slice(0, additionalInfoData.index),
                additionalInfoData,
                ...updatedAdditionalInfo.slice(additionalInfoData.index)
            ];
        } else {
            updatedAdditionalInfo.push(additionalInfoData); // Push to the end if the index doesn't exist
        }
        setSourceReferenceData(prev => ({
            ...prev,
            additionalInfo: updatedAdditionalInfo
        }));

        setAdditionalInfoData(initialTempAdditionalInfo);

    }
    const removeByIndex = (indexToRemove) => {
        setSourceReferenceData((prevData) => ({
            ...prevData, // Spread the previous data to retain other properties
            additionalInfo: prevData.additionalInfo.filter((_, index) => index !== indexToRemove), // Update additionalInfo
        }));
    };
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
                                        {/* <ArgonTypography variant="h6">Add Source Reference</ArgonTypography> */}
                                        <ArgonTypography variant="h6">Add Audit Preparation</ArgonTypography>
                                    </Grid>
                                    <Grid item xs={4} container spacing={2} justifyContent="flex-end">
                                        <Grid item>
                                            <BackButton></BackButton>
                                        </Grid>
                                        <Grid item>
                                            <ArgonButton
                                                id="saveButton"  // Added the id here
                                                onClick={async () => {
                                                    if (await sourceReferenceValidator.validateForm()) {
                                                        setloading(true)
                                                        var response = await SourceReferenceObjectServiceAPI.create(sourceReferenceData);
                                                        setloading(false)
                                                        if (response.status === 200) {
                                                            sourceReferenceValidator.handleChange("id", response.data.id);
                                                        }
                                                        toastWithCommonResponse(response);
                                                    }
                                                }}
                                                sx={{ width: 30 }}
                                                color={"success"}
                                            >
                                                {isCreated() ? "Update" : "Save"}
                                            </ArgonButton>
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
                                    <SourceReferenceInputField
                                        // placeholder={"Source Object Name"}
                                        placeholder={"Audit Reference"}
                                        value={sourceReferenceData.sourceReferenceName}
                                        fieldName={"sourceReferenceName"}
                                        validator={sourceReferenceValidator}
                                    />
                                    <SourceReferenceInputField
                                        // placeholder={"Source Reference Key"}
                                        placeholder={"Audit Reference Id"}
                                        value={sourceReferenceData.sourceReferenceKey}
                                        fieldName={"sourceReferenceKey"}
                                        validator={sourceReferenceValidator}
                                    />
                                </Grid>
                            </ArgonBox>
                            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={2} >
                                <Grid item xs={8}>
                                    <ArgonTypography variant="h6">Add Audit Attribute Tracker</ArgonTypography>
                                </Grid>
                                <Grid item xs={4} container spacing={2} justifyContent="flex-end">
                                    <Grid item>
                                        <ArgonButton ref={buttonRef} // Assign the reference to the button
                                            onClick={async () => {
                                                if (await additionalInfoValidator.validateForm()) {
                                                    saveAdditionalInfo()
                                                }
                                            }} sx={{ width: 30 }} color={"success"}> Add</ArgonButton>
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
                                component="form"
                                role="form"
                                onSubmit={() => {

                                }}
                            >
                                <Grid container
                                    spacing={3}
                                    direction="row"
                                    sx={{
                                        justifyContent: "space-between",
                                        alignItems: "start",
                                    }}>
                                    <SourceReferenceInputField
                                        md={12}
                                        placeholder={"Field Name"}
                                        value={additionalInfoData.fieldName}
                                        fieldName={"fieldName"}
                                        validator={additionalInfoValidator}
                                    />
                                    {/* <SourceReferenceInputField
                                        placeholder={"Field Value"}
                                        value={additionalInfoData.fieldValue}
                                        fieldName={"fieldValue"}
                                        validator={additionalInfoValidator}
                                        onKeyPress={handleKeyPress} // Add the event handler here
                                    /> */}
                                </Grid>
                            </ArgonBox>
                            <DynamicTable
                                data={sourceReferenceData.additionalInfo != null ? sourceReferenceData.additionalInfo : []}
                                columns={additionalInfoColumns}
                                title={null}
                                actions={(item, index) => (
                                    <>
                                        <Grid
                                            p={1}
                                            container
                                            direction="row"
                                            spacing={2}
                                            sx={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Grid item>
                                                <ArgonButton
                                                    color="info"
                                                    size="small"
                                                    sx={{
                                                        width: 30,
                                                        fontSize: 10,
                                                    }}
                                                    onClick={() => {
                                                        setAdditionalInfoData((prevData) => ({
                                                            ...prevData,
                                                            index: index,
                                                            fieldName: item.fieldName,
                                                            fieldValue: item.fieldValue
                                                        }))
                                                        removeByIndex(index)

                                                    }}
                                                >
                                                    Edit
                                                </ArgonButton>
                                            </Grid>
                                            <Grid item>

                                                <ArgonButton
                                                    color="error"
                                                    size="small"
                                                    sx={{
                                                        width: 30,
                                                        fontSize: 10,
                                                    }}
                                                    onClick={() => {

                                                        removeByIndex(index)
                                                    }}
                                                >
                                                    Remove
                                                </ArgonButton>
                                            </Grid>
                                        </Grid>
                                    </>
                                )}
                            />
                        </Card>
                    </ArgonBox>
                </ArgonBox>
            </DashboardLayout>
        </>
    )
};

export default CreateOrUpdateSourceReference;
