import React from "react";
import { Skeleton, TableContainer, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { Table as MuiTable } from "@mui/material";
import config from "../../../config";

function ViewAuditTableSkeleton({ columns }) {
  const renderSkeletonColumns = columns.map(({ name, align }, key) => {
    let pl = key === 0 ? 3 : 1;
    let pr = key === columns.length - 1 ? 3 : 1;

    return (
      <Box
        key={name}
        component="th"
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        sx={({ palette: { light } }) => ({
          borderBottom: `1px solid ${light.main}`,
          width: "auto",
        })}
      >
        <Skeleton variant="text" width="100%" />
      </Box>
    );
  });

  const renderSkeletonRows = new Array(config.DEFAULT_SIZE_PAGE).fill().map((_, index) => (
    <TableRow key={index}>
      {columns.map((column, key) => (
        <TableCell key={key}>
          <Skeleton variant="rectangular" height={40} />
        </TableCell>
      ))}
      <TableCell>
        <Skeleton variant="circular" width={30} height={30} />
      </TableCell>
    </TableRow>
  ));

  return (
    <TableContainer>
      <MuiTable>
        <Box component="thead">
          <TableRow>{renderSkeletonColumns}</TableRow>
        </Box>
        <TableBody>{renderSkeletonRows}</TableBody>
      </MuiTable>
    </TableContainer>
  );
}

export default ViewAuditTableSkeleton;
