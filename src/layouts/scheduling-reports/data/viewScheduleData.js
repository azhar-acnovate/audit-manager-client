import React from "react";
import ArgonTypography from "../../../components/ArgonTypography";
import ArgonBox from "../../../components/ArgonBox";

export function viewScheduleData(data) {
    return {
        filterIntialValue: {
            sort: {},
            filter: {}
        },
        columns: [
            { name: "reportsName", label: "Report Name", align: "center" },
            { name: "frequency", label: "Scheduling (frequency)", align: "center" },
            { name: "recipients", label: "Recipients", align: "center" },
            { name: "action", label: "Actions", align: "center" },
        ],
        rows: (data || []).map((audit) => ({
            reportsName: renderReportNames(audit.reportsName),
            frequency: `Scheduling ${audit.readableCron}`,
            recipients: renderRecipients(audit.recipients),
            item: audit
        }))
    };
}

// Render Report Names
const renderReportNames = (reportsName) => (
    <ArgonBox
        sx={{
            width: '190px',
            height: '60px',
            overflowY: 'auto',
            padding: '5px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        }}
    >
        <ArgonTypography variant="caption" color="secondary" fontWeight="medium" sx={{ marginBottom: '6px', textAlign: 'left' }}>
            {Array.isArray(reportsName) ? reportsName.join(", ") : reportsName}
        </ArgonTypography>
    </ArgonBox>
);

// // Render Frequency
// const renderFrequency = (audit) => (
//     <ArgonTypography px={4} variant="caption" color="secondary" fontWeight="medium">
//         {`${audit.frequency} ${audit.schedulingHour} : ${audit.schedulingMinute} ${audit.timeMarker}`}
//     </ArgonTypography>
// );

// Render Recipients
const renderRecipients = (recipients) => (
    <ArgonBox
        sx={{
            width: '190px',
            height: '60px',
            overflowY: 'auto',
            padding: '5px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        }}
    >
        {Array.isArray(recipients) && recipients.length > 0 ? (
            recipients.map((recipient, index) => (
                <ArgonTypography key={index} variant="caption" color="secondary" fontWeight="medium" sx={{ marginBottom: '6px' }}>
                    {recipient}
                </ArgonTypography>
            ))
        ) : (
            <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                No recipients
            </ArgonTypography>
        )}
    </ArgonBox>
);
