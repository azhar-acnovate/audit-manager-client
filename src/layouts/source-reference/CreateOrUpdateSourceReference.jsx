import React from "react"
import { useDecodedId } from "../../hooks/useDecodedData";
import { additionalInfoColumns, initialTempAdditionalInfo, initialTempSourceReferenceData } from "./data/createOrUpdateSourceReferenceData";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import SimpleBackdrop from "../../components/SimpleBackDrop";
import ArgonBox from "../../components/ArgonBox";
import { Card, Grid, TableCell } from "@mui/material";
import ArgonTypography from "../../components/ArgonTypography";
import useValidation from "../../hooks/GlobalValidationHook";
import BackButton from "../../components/BackButton";
import ArgonButton from "../../components/ArgonButton";
import SourceReferenceInputField from "./components/SourceReferenceInputField";
import DynamicTable from "../../components/DynamicTable";
import { validateAdditionalItems } from "ajv/dist/vocabularies/applicator/additionalItems";
import { Link } from "react-router-dom";

const CreateOrUpdateSourceReference = (props) => {
    let decodedId = useDecodedId()
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
            // setloading(true)
            // var res = await AuditObjectChangeTrackerServiceAPI.findOne(decodedId)
            // if (res.status === 200) {
            //     setObjectTrackerData((prevData) => ({
            //         ...prevData,
            //         id: res.data.id,
            //         refObjectId: res.data.refObjectId,
            //         eventType: res.data.eventType,
            //         eventOccurence: res.data.eventOccurence,
            //     }))
            //     setSubData(res.data.attributeChanges);
            // }
            // setloading(false)
        }
        if (decodedId != null) {
            fetchData()
        }

    }, [decodedId])
    console.log(sourceReferenceData)
    const saveAdditionalInfo = () => {
        var updatedAdditionalInfo = sourceReferenceData.additionalInfo;
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
                                        <ArgonTypography variant="h6">Add Source Reference</ArgonTypography>
                                    </Grid>
                                    <Grid item xs={4} container spacing={2} justifyContent="flex-end">
                                        <Grid item>
                                            <BackButton></BackButton>
                                        </Grid>
                                        <Grid item>
                                            <ArgonButton onClick={async () => {
                                                if (await sourceReferenceValidator.validateForm()) {
                                                    // console.log("Adding attribute:", objectTrackerData);
                                                    // setloading(true)
                                                    // var response = await AuditObjectChangeTrackerServiceAPI.createAuditObjectChangeTracker(objectTrackerData);
                                                    // setloading(false)
                                                    // if (response.status === 200) {
                                                    //     objectTrackerValidator.handleChange("id", response.data.id);

                                                    // }
                                                    // toastWithCommonResponse(response)
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
                                    <SourceReferenceInputField
                                        placeholder={"Source Object Name"}
                                        value={sourceReferenceData.objectName}
                                        fieldName={"objectName"}
                                        validator={sourceReferenceValidator}
                                    />
                                    <SourceReferenceInputField
                                        placeholder={"Source Reference Key"}
                                        value={sourceReferenceData.refernceKey}
                                        fieldName={"refernceKey"}
                                        validator={sourceReferenceValidator}
                                    />
                                </Grid>
                            </ArgonBox>
                            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={2} >
                                <Grid item xs={8}>
                                    <ArgonTypography variant="h6">Additional Data</ArgonTypography>
                                </Grid>
                                <Grid item xs={4} container spacing={2} justifyContent="flex-end">
                                    <Grid item>
                                        <ArgonButton onClick={async () => {
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
                                        placeholder={"Field Name"}
                                        value={additionalInfoData.fieldName}
                                        fieldName={"fieldName"}
                                        validator={additionalInfoValidator}
                                    />
                                    <SourceReferenceInputField
                                        placeholder={"Field Value"}
                                        value={additionalInfoData.fieldValue}
                                        fieldName={"fieldValue"}
                                        validator={additionalInfoValidator}
                                    />
                                </Grid>
                            </ArgonBox>
                            <DynamicTable
                                data={sourceReferenceData.additionalInfo}
                                columns={additionalInfoColumns}
                                title={null}
                                actions={(item, index) => (
                                    <>
                                        <Grid
                                        p={1}
                                            container
                                            direction="row"
                                            sx={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >

                                            <ArgonButton
                                                color="error"
                                                size="small"
                                                sx={{
                                                    width: 30,
                                                    fontSize: 10,
                                                }}
                                                onClick={()=>{

                                                    removeByIndex(index)
                                                }}
                                            >
                                                Remove
                                            </ArgonButton>
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
