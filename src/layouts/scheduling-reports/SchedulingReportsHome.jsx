import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@mui/material";
import { toast } from "react-toastify";

import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../dashboard/DashboardNavbar";
import ArgonBox from "../../components/ArgonBox";
import ArgonTypography from "../../components/ArgonTypography";
import ArgonButton from "../../components/ArgonButton";
import FadeInComponent from "../../components/FadeInComponent";

import { viewScheduleData } from "./data/viewScheduleData";
import ViewScheduleTable from "./components/ViewScheduleTable";
import ViewSchedulingTableSkeleton from "./components/ViewSchedulingTableSkeleton";
import schedulingReportService from "../../rest-services/schedulingReportService";

const SchedulingReportsHome = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await schedulingReportService.getSavedReports();
        setResponse(data);
      } catch (e) {
        toast.error("Failed to fetch saved reports");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Prepare table columns and rows
  const { columns, rows } = viewScheduleData(response ? response.data : []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3}>
        <ArgonBox mb={3}>
          <Card>
            <ArgonBox display="flex" justifyContent="space-between" alignItems="center" p={2}>
              <ArgonTypography variant="h6">Scheduling Reports View</ArgonTypography>
              <ArgonButton component={Link} to="./create" color="info">
                Create
              </ArgonButton>
            </ArgonBox>

            {/* Table rendering section */}
            <ArgonBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <FadeInComponent
                visible={loading}
                child={<ViewSchedulingTableSkeleton columns={columns} />}
                replacement={
                  <div>
                    <ViewScheduleTable columns={columns} rows={rows} data={response && response.content} />
                  </div>
                }
              />
            </ArgonBox>
          </Card>
        </ArgonBox>
      </ArgonBox>
    </DashboardLayout>
  );
};

export default SchedulingReportsHome;
