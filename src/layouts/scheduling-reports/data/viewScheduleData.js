import React from "react";
import ArgonTypography from "../../../components/ArgonTypography";
import ArgonBox from "../../../components/ArgonBox"; 

const testData = [
    {
        reportName: {
            reportNameName: "Test Report 1",
            reportNameKey: "Weekly 10:30 AM",
            recipients: [
                "maliabhi168@gmail.com",
                "abhishek123@gmail.com",
                "test3@example.com",
                "abhinav4@gmail.com.com",
                "abhi123@gmail.com"
            ]
        }
    },
    {
        reportName: {
            reportNameName: "Test Report 2",
            reportNameKey: "Monthly 11:20 AM",
            recipients: ["recipient3@example.com", "recipient4@example.com"]
        }
    }
];

export function viewScheduleData(data) {
    data = data.length === 0 ? testData : data;
    return {
        filterIntialValue: {
            sort: {},
            filter: {}
        },
        columns: [
            { name: "reportName", label: "Report Name", align: "center" },
            { name: "frequency", label: "Scheduling(frequency)", align: "center" },
            { name: "recipients", label: "Recipients", align: "center" }, // Third column for recipients
        ],
        rows: data == null ? [] : data.map((audit) => ({
            reportName: (
                <ArgonTypography px={4} variant="caption" color="secondary" fontWeight="medium">
                    {audit.reportName && audit.reportName.reportNameName}
                </ArgonTypography>
            ),
            frequency: (
                <ArgonTypography px={4} variant="caption" color="secondary" fontWeight="medium">
                    {audit.reportName && audit.reportName.reportNameKey}
                </ArgonTypography>
            ),
            recipients: (
                <ArgonBox
                    sx={{
                        width: '190px',      
                        height: '60px', 
                        overflowY: 'auto',   // Enable vertical scroll
                        padding: '5px',      
                        border: '1px solid #e0e0e0', // Optional: Add a border for better visual distinction
                        borderRadius: '4px', 
                        display: 'flex',     // Set flexbox layout for better alignment
                        flexDirection: 'column',
                        alignItems: 'flex-start', // Stack items vertically
                    }}
                >
                   
                    {Array.isArray(audit.reportName.recipients) ? (
                        audit.reportName.recipients.map((recipient, index) => (
                            <ArgonTypography key={index} variant="caption" color="secondary" fontWeight="medium" sx={{ marginBottom: '6px' }} >
                                {recipient}
                            </ArgonTypography>
                        ))
                    ) : (
                        <ArgonTypography variant="caption" color="secondary" fontWeight="medium">
                            No recipients
                        </ArgonTypography>
                    )}
                </ArgonBox>
            ),
            item: audit
        }))
    };
}
