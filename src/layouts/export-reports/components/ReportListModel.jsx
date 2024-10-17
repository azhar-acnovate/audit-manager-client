import { Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Checkbox } from "@mui/material";
import React from "react";
import ArgonButton from "../../../components/ArgonButton";
import AuditReportServiceAPI from "../../../rest-services/audit-report-service";

const ReportListModel = (props) => {
    const [response, setResponse] = React.useState(null);
    const { value: valueProp, useOpen: useOpenProps, ...other } = props;
    const [selectedReports, setSelectedReports] = valueProp;  // Destructure from props
    const [open, setOpen] = useOpenProps;  // Destructure open state from props

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AuditReportServiceAPI.findAll();
                setResponse(response);
            } catch (e) {
                console.error("Failed to fetch reports", e);
            }
        };
        fetchData();
    }, []);

    const close = () => setOpen(false);

    const handleChange = (event, optionId) => {
        const isChecked = event.target.checked;
        setSelectedReports((prev) =>
            isChecked ? [...prev, optionId] : prev.filter((item) => item !== optionId)
        );
    };

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
            maxWidth="xs"
            open={open}
            {...other}
        >
            <DialogTitle>Reports</DialogTitle>
            <DialogContent sx={{ pl: 3 }} dividers>
                {response != null && response.data != null ? response.data.map((option) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectedReports.includes(option.id)}
                                onChange={(event) => handleChange(event, option.id)}
                            />
                        }
                        label={option.reportName}
                        key={option.id}
                    />
                )) : null}
            </DialogContent>
            <DialogActions>
                <ArgonButton sx={{ width: 100 }} autoFocus color={"error"} onClick={() => {
                    setSelectedReports([]);
                    close();
                }}>
                    Cancel
                </ArgonButton>
                <ArgonButton sx={{ width: 100 }} color={"success"} onClick={close}>Use</ArgonButton>
            </DialogActions>
        </Dialog>
    );
};

export default ReportListModel;
