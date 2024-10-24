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
            height={300}
            series={[{ data: uData, label: lineChartLabel }]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
          />
        </Card>
      </Grid>

      {/* Pie Chart in its own Card */}
      <Grid item xs={12} md={6}>
        <Card>
          <PieChart
            // width={400}  // Increased width to avoid overlapping
            height={300} // Increased height to avoid overlapping

            series={[
              {

                data: pieData,
             //   arcLabel: (item) => `${calculatePercentage(item.value)}%`,
             valueFormatter: (v, { dataIndex }) => {
              const val = uData[dataIndex];
              return `${calculatePercentage(val)}%`;
            },
              //  arcLabelMinAngle: 35,
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
