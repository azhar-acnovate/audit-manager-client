import React from "react";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import ArgonBox from "../../components/ArgonBox";
import SchedulingReportForm from "./components/SchedulingReportForm";  // Updated import path
import { ToastContainer } from "react-toastify";

const SchedulingReportsHome = () => {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <ArgonBox py={3}>
                <SchedulingReportForm />
            </ArgonBox>
            <ToastContainer />
        </DashboardLayout>
    );
};

export default SchedulingReportsHome;
