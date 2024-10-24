/* eslint-disable no-unused-vars */
/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "../../components/ArgonBox";
import ArgonTypography from "../../components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "../../examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "./DashboardNavbar";
import Footer from "../../examples/Footer";
import DetailedStatisticsCard from "../../examples/Cards/StatisticsCards/DetailedStatisticsCard";
// import SalesTable from "../../examples/Tables/SalesTable";
// import CategoriesList from "../../examples/Lists/CategoriesList";
// import GradientLineChart from "../../examples/Charts/LineCharts/GradientLineChart";

// Argon Dashboard 2 MUI base styles
import typography from "../../assets/theme/base/typography";

// Dashboard layout components
import Slider from "./components/Slider";

// Data
// import gradientLineChartData from "./data/gradientLineChartData";
import salesTableData from "./data/salesTableData";
import categoriesListData from "./data/categoriesListData";
import DashboardChart from "./components/dashboard_charts";
import React from "react";
import AuditObjectChangeTrackerServiceAPI from "../../rest-services/audit-object-change-tracker-service";
import SimpleBackdrop from "../../components/SimpleBackDrop";


function Default() {
  const { size } = typography;
  const [response, setResponse] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await AuditObjectChangeTrackerServiceAPI.getDashbordData()
        setResponse(response.data)
      } catch (e) {

      } finally {
        setLoading(false);
      }
    }
    fetchData()
  }, [])
  function isNegative(n) {
    return n < 0;
  }

  const getDetailCard = () => {
    <DetailedStatisticsCard
      title="Attribute Changes"
      count={response.attributeChangesYesterday}
      icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
      percentage={{ color: isNegative(response.attributeChangePercentageSinceYesterday) ? "error" : "success", count: `${response.attributeChangePercentageSinceYesterday}%`, text: "since yesterday" }}
    />
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SimpleBackdrop loading={loading} />
      {response && <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Attribute Changes"
              count={response.attributeChangesYesterday}
              icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
              percentage={{ count: response.attributeChangePercentageSinceYesterday, text: "since yesterday" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Object Changes"
              count={response.objectChangesLastWeek}
              icon={{ color: "error", component: <i className="ni ni-world" /> }}
              percentage={{ count: response.objectChangePercentageSinceLastWeek, text: "since last week" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Changes by User"
              count={response.userChangesLastQuarter}
              icon={{ color: "success", component: <i className="ni ni-paper-diploma" /> }}
              percentage={{ count: response.userChangePercentageSinceLastQuarter, text: "since last quarter" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Event Occurrences"
              count={response.eventOccurrencesLastMonth}
              icon={{ color: "warning", component: <i className="ni ni-cart" /> }}
              percentage={{ count: response.eventOccurrencePercentageSinceLastMonth, text: "than last month" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} mb={1}>
          <DashboardChart chartData={response.top5UserModifyingDataFrequently} lineChartLabel={"Top 5 users adding/modifying data frequently"}></DashboardChart>
        </Grid>
        <Grid container spacing={3} mb={1}>
          <DashboardChart chartData={response.top5ChangedAttributes} lineChartLabel={"Top 5 attributes which are getting change frequently"}></DashboardChart>
        </Grid>
      </ArgonBox>}
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
