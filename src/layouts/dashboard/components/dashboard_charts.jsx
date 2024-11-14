import { Card, Grid } from "@mui/material";
import { LineChart, PieChart } from "@mui/x-charts";
import React from "react";

const DashboardChart = ({ chartData, lineChartLabel }) => {


  // Extract labels (usernames) and data (modification counts)
  const xLabels = Object.keys(chartData);
  const uData = Object.values(chartData);
  const total = uData.reduce((accumulator, current) => accumulator + current, 0);
  function calculatePercentage(part) {
    if (total === 0) {
      return 0; // Avoid division by zero
    }
    return ((part / total) * 100).toFixed(2);
  }
  // Data for PieChart
  const pieData = xLabels.map((label, index) => ({
    id: label || "NA", // Handle empty string for label
    value: uData[index],
    label: label || "NA", // Adding label here for each slice
  }));

  return (
    <Grid p={2} container spacing={2}>
      {/* Line Chart in its own Card */}
      <Grid item xs={12} md={6}>
        <Card>
          <LineChart
            //  width={500}
            height={350} // Increased height to avoid overlapping
            series={[{ data: uData, label: lineChartLabel }]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
          />
        </Card>
      </Grid>

      {/* Pie Chart in its own Card */}
      <Grid item xs={12} md={6}>
        <Card>
          <PieChart
            margin={{ top: 100, bottom: 100, left: 100, right: -100 }}
            slotProps={{
              // legend: {
              //   direction: 'row',
              //   position: { vertical: 'bottom', horizontal: 'middle' },
              //   padding: 0,
              // },
              legend: {
                labelStyle: {
                  fontSize: 12,
                },
                direction: 'column',
                position: { vertical: 'middle', horizontal: 'left' },
                padding: 10,
              },
            }}
            // margin={{ top: 0, bottom: 100, left: 100, right: 100 }}
            // slotProps={{
            //   legend: {
            //     direction: 'row',
            //     position: { vertical: 'bottom', horizontal: 'middle' },
            //     padding: 0,
            //   },
            // }}
            //   margin={{ top: 100, bottom: 100, left: -100, right: 100 }}
            // slotProps={{
            //   legend: {
            //     labelStyle: {
            //       textAlign: 'left', // Aligns label text to the left
            //       fontSize: 10,
            //     },
            //     direction: 'column',
            //     position: { vertical: 'middle', horizontal: 'right' },
            //     padding: 10,
            //   },
            // }}
            height={350} // Increased height to avoid overlapping
            series={[
              {

                data: pieData,
                valueFormatter: (v, { dataIndex }) => {
                  const val = uData[dataIndex];
                  return `${calculatePercentage(val)}%`;
                },

                arcLabelRadius: '85%',
                label: {
                  position: 'outside',  // Set labels outside
                  offset: 0,           // Increase the gap here (adjust as needed)
                  color: '#000',        // Label text color
                },
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                innerRadius: 20,         // Adjust to control the size of the pie
                outerRadius: 100,        // Adjust the size of the pie

              },
            ]}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardChart;
