
import React from "react"
import ArgonButton from "../../../components/ArgonButton";
import { Grid } from "@mui/material";
import SimpleBackdrop from "../../../components/SimpleBackDrop";
import schedulingReportService from "../../../rest-services/schedulingReportService";
import { useToast } from "../../../components/toast/Toast";
// import colors from "../../../assets/theme/base/colors";
const ActionButton = ({ item }) => {
    // const { gradients } = colors;
    const [loading, setLoading] = React.useState(false);
    const [isActive,setActive] =React.useState(item.active);
    const { toastWithCommonResponse } = useToast();
    return (
        <>
            <SimpleBackdrop loading={loading} />
            <Grid
                container
                direction="row"
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ArgonButton
                    onClick={async () => {
                        setLoading(true);
                        let res;
                        if(isActive){
                           res = await schedulingReportService.cancelReport(item.id)
                        }else{
                            res = await schedulingReportService.rescheduleReport(item.id)
                        }
                       
                        console.log(res)
                        toastWithCommonResponse(res)
                        setLoading(false)
                        setActive(!isActive)

                    }}
                    color={isActive?'error':'info'}
                    size="small"
                    sx={{
                        width: 40,
                        fontSize: 10,
                    }}

                >
                    {isActive?'Cancel':'Reschedule'}
                </ArgonButton>
            </Grid>
        </>
    )
};

export default ActionButton;
