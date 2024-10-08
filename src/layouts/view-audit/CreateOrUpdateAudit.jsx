import React from "react"
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import ArgonBox from "../../components/ArgonBox";
import { Card, Grid, TableCell, Tooltip } from "@mui/material";
import ArgonTypography from "../../components/ArgonTypography";
import SubTable, { subTablePaddingSize } from "./components/SubTable";
import ArgonButton from "../../components/ArgonButton";
import AttributeInputField from "./components/AttributeInputField";
import useValidation from "../../hooks/GlobalValidationHook";
import { initialTempAttibuteData, initialTempObjectData } from "./data/createOrUpdate";
import ObjectTrackerInputField from "./components/ObjectTrackerInputField";
import CustomDatepicker from "./components/CustomDatePicker";
import { DateFormatter, eventOccurenceDateFormat } from "../../utils/DateFormatter";
import AuditObjectChangeTrackerServiceAPI from "../../rest-services/audit-object-change-tracker-service";
import { useToast } from "../../components/toast/Toast";
import SimpleBackdrop from "../../components/SimpleBackDrop";
import { Edit } from "@mui/icons-material";
import AuditAttributeChangeTrackerServiceAPI from "../../rest-services/audit-attribute-change-tracker-service";
import { useDecodedId } from "../../hooks/useDecodedData";
import BackButton from "../../components/BackButton";
import SourceReferenceAutocomplete from "../../components/SourceReferenceAutocomplete";

const CreateOrUpdateAudit = (props) => {
    let decodedId = useDecodedId()
    const [loading, setloading] = React.useState(false)
    const [subData, setSubData] = React.useState([]);
    const [attributeTrackerData, setAttributeTrackerData] = React.useState(initialTempAttibuteData);
    const attributeTrackerValidator = useValidation(attributeTrackerData, setAttributeTrackerData);
    const [objectTrackerData, setObjectTrackerData] = React.useState(initialTempObjectData);
    const objectTrackerValidator = useValidation(objectTrackerData, setObjectTrackerData);

    React.useEffect(() => {
        const fetchData = async () => {
            setloading(true)
            var res = await AuditObjectChangeTrackerServiceAPI.findOne(decodedId)
            if (res.status === 200) {
                setObjectTrackerData((prevData) => ({
                    ...prevData,
                    id: res.data.id,
                    refObjectId: res.data.refObjectId,
                    eventType: res.data.eventType,
                    eventOccurence: res.data.eventOccurence,
                }))
                setSubData(res.data.attributeChanges);
            }
            setloading(false)
        }
        if (decodedId != null) {
            fetchData()
        }

    }, [decodedId])

    const isCreatedObjectTracker = () => {
        return objectTrackerData.id !== null;
    }
    const isCreatedAttributeTracker = () => {
        return attributeTrackerData.id !== null;
    }
    const removeByIndex = (indexToRemove) => {
        setSubData((prevData) =>
            prevData.filter((_, index) => index !== indexToRemove)
        );
    };
    const setSubDataValue = () => {
        setSubData((previousValue) => {

            var updatedArray = [...previousValue];

            // Ensure the index exists before updating
            if (attributeTrackerData.index != null) {
                updatedArray = [
                    ...updatedArray.slice(0, attributeTrackerData.index),
                    attributeTrackerData,
                    ...updatedArray.slice(attributeTrackerData.index)
                ];
            } else {
                updatedArray.push(attributeTrackerData); // Push to the end if the index doesn't exist
            }

            return updatedArray;
        });

        setAttributeTrackerData(initialTempAttibuteData);

    }
    //TODO  if not require need to remove
    // eslint-disable-next-line
    const getActions = (item, index) => {
        return (
            <TableCell sx={{ padding: subTablePaddingSize, textAlign: 'center' }}>

                <Grid
                    container
                    direction="row"
                    sx={{
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}
                >

                    <Edit color={isCreatedAttributeTracker() ? "disabled" : "warning"} onClick={() => {
                        if (!isCreatedAttributeTracker()) {
                            var seletedItem = subData[index];
                            seletedItem.index = index
                            setAttributeTrackerData(seletedItem)
                            removeByIndex(index);
                        }

                    }} />
                    {/* <Delete onClick={() => {
                        removeByIndex(index)
                    }} /> */}
                </Grid>

            </TableCell>)
    }

    const { toastWithCommonResponse } = useToast();
    return <>
        <DashboardLayout>
            <DashboardNavbar />
            <SimpleBackdrop loading={loading} />
            <ArgonBox py={3}>
                <ArgonBox mb={3} >
                    <Card>
                        <ArgonBox p={2}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={8}>
                                    <ArgonTypography variant="h6">Add Audit Object Tracker</ArgonTypography>
                                </Grid>
                                <Grid item xs={4} container spacing={2} justifyContent="flex-end">
                                    <Grid item>
                                        <BackButton></BackButton>
                                    </Grid>
                                    <Grid item>
                                        <ArgonButton onClick={async () => {
                                            if (await objectTrackerValidator.validateForm()) {
                                                console.log("Adding attribute:", objectTrackerData);
                                                setloading(true)
                                                var response = await AuditObjectChangeTrackerServiceAPI.createAuditObjectChangeTracker(objectTrackerData);
                                                setloading(false)
                                                if (response.status === 200) {
                                                    objectTrackerValidator.handleChange("id", response.data.id);

                                                }
                                                toastWithCommonResponse(response)
                                            }
                                        }}
                                            sx={{ width: 30 }}
                                            color={"success"}>{isCreatedObjectTracker() ? "Update" : "Save"}</ArgonButton>
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
                                {/* <ObjectTrackerInputField
                                    placeholder={"Ref Object Id"}
                                    value={objectTrackerData.refObjectId}
                                    fieldName={"refObjectId"}
                                    validator={objectTrackerValidator} /> */}
                                <Grid item xs={2} sm={4} md={4} >
                                    <SourceReferenceAutocomplete
                                        defaultValue={objectTrackerData.refObjectId}
                                        helperText={objectTrackerValidator.errors['refObjectId']}
                                        error={Boolean(objectTrackerValidator.errors['refObjectId'])}
                                        onChange={(value) => {
                                            if (value && value.id) {
                                                objectTrackerValidator.handleChange('refObjectId', value.id)
                                            }

                                        }}
                                    />
                                </Grid>

                                <ObjectTrackerInputField
                                    placeholder={"Event Type"}
                                    value={objectTrackerData.eventType}
                                    fieldName={"eventType"}
                                    validator={objectTrackerValidator} />
                                <Grid item xs={2} sm={4} md={4} >
                                    <ArgonBox mb={2}>
                                        <CustomDatepicker defaultValue={objectTrackerData.eventOccurence} onChange={(newDate) => {

                                            objectTrackerValidator.handleChange("eventOccurence", DateFormatter.dateToString(newDate, eventOccurenceDateFormat))
                                        }}></CustomDatepicker>
                                    </ArgonBox>
                                </Grid>

                            </Grid>
                        </ArgonBox>
                        <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={2} >
                            <Grid item xs={8}>
                                <ArgonTypography variant="h6">Add Audit Attribute Tracker</ArgonTypography>
                            </Grid>
                            <Grid item xs={4} container spacing={2} justifyContent="flex-end">
                                <Grid item>
                                    <Tooltip title={isCreatedObjectTracker() ? "" : "Please Save Audit first"}>
                                        <div>
                                            <ArgonButton
                                                onClick={async () => {
                                                    if (await attributeTrackerValidator.validateForm()) {
                                                        console.log("Adding attribute:", attributeTrackerData);
                                                        attributeTrackerData.auditObjectChangeTrackerId = objectTrackerData.id
                                                        var response = await AuditAttributeChangeTrackerServiceAPI.createAuditAttributeChangeTracker(attributeTrackerData);

                                                        toastWithCommonResponse(response)
                                                        if (response.status === 200) {
                                                            attributeTrackerData.id = response.data.id;

                                                            setSubDataValue()

                                                        }

                                                    }
                                                }}
                                                sx={{ width: 30 }}
                                                disabled={!isCreatedObjectTracker()}
                                                color={"success"}
                                            >
                                                {!isCreatedAttributeTracker() ? 'Add' : 'Update'}
                                            </ArgonButton>
                                        </div>
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    {isCreatedAttributeTracker() && <ArgonButton

                                        onClick={() => {
                                            setSubDataValue()
                                        }}

                                        sx={{ width: 30 }}
                                        disabled={!isCreatedObjectTracker()}
                                        color={"error"}
                                    >
                                        Cancel
                                    </ArgonButton>}
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
                                <AttributeInputField
                                    disabled={!isCreatedObjectTracker()}
                                    placeholder={"Attribute Name"}
                                    value={attributeTrackerData.attributeName}
                                    fieldName={"attributeName"}
                                    validator={attributeTrackerValidator}
                                />

                                <AttributeInputField
                                    disabled={!isCreatedObjectTracker()}
                                    placeholder={"Old Value"}
                                    value={attributeTrackerData.oldValue}
                                    fieldName={"oldValue"}
                                    validator={attributeTrackerValidator}
                                />
                                <AttributeInputField
                                    disabled={!isCreatedObjectTracker()}
                                    placeholder={"New Value"}
                                    value={attributeTrackerData.newValue}
                                    fieldName={"newValue"}
                                    validator={attributeTrackerValidator}
                                />
                                <AttributeInputField
                                    disabled={!isCreatedObjectTracker()}
                                    placeholder={"Changed By"}
                                    value={attributeTrackerData.changedBy}
                                    fieldName={"changedBy"}
                                    validator={attributeTrackerValidator}
                                />

                            </Grid>
                        </ArgonBox>
                        <SubTable
                            subData={subData}
                            //actions={getActions}
                            gridSize={{ xs: 12 }}
                            title={null}></SubTable>
                    </Card>
                </ArgonBox>
            </ArgonBox>
        </DashboardLayout>

    </>

};

export default CreateOrUpdateAudit;
