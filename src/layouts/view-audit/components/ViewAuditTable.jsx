import ArgonAvatar from "../../../components/ArgonAvatar";
import ArgonBox from "../../../components/ArgonBox";
import ArgonTypography from "../../../components/ArgonTypography";
import React, { useMemo, useState } from "react";

// prop-types is a library for typechecking of props
// import PropTypes from "prop-types";

// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";
import { Collapse, TableBody, TableContainer, TableRow } from "@mui/material";
import typography from "../../../assets/theme/base/typography";
import borders from "../../../assets/theme/base/borders";
// @mui material components
import { Table as MuiTable } from "@mui/material";
import ActionButton from "./ActionButton";
import SubTable from "./SubTable";
// import { ArrowBack, ArrowForward } from "@mui/icons-material";
import pxToRem from "../../../assets/theme/functions/pxToRem";
import ServerSidePagination from "../../../components/ServerSidePagination";
function ViewAuditTable({ columns, rows,data,setPageNo }) {
    // const { size, fontWeightBold } = typography;
    const { borderWidth } = borders;

    const [expandedRow, setExpandedRow] = useState(null);

    const handleExpandClick = (rowKey) => {
        setExpandedRow(expandedRow === rowKey ? null : rowKey);
    };

    const renderColumns = columns.map(({ name, label, align, width }, key) => {
        let pl = key === 0 ? 3 : 1;
        let pr = key === columns.length - 1 ? 3 : 1;

        return (
            <ArgonBox
                key={name}
                component="th"
                width={width || "auto"}
                pt={1.5}
                pb={1.25}
                pl={align === "left" ? pl : 3}
                pr={align === "right" ? pr : 3}
                textAlign={align}
                fontSize={pxToRem(14)}
                fontWeight={typography.fontWeightBold}
                color="secondary"
                opacity={0.7}
                sx={({ palette: { light } }) => ({ borderBottom: `${borderWidth[1]} solid ${light.main}` })}
            >
                {label && label.toUpperCase()}
            </ArgonBox>
        );
    });

    const renderRows = rows.map((row, key) => {
        const rowKey = `row-${key}`;
        const isExpanded = expandedRow === rowKey;

        const tableRow = columns.map(({ name, align }) => {
            let template;

            if (Array.isArray(row[name])) {
                template = (
                    <ArgonBox
                        key={uuidv4()}
                        component="td"
                        p={1}
                        sx={({ palette: { light } }) => ({
                            borderBottom: row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null,
                        })}
                    >
                        <ArgonBox display="flex" alignItems="center" py={0.5} px={1}>
                            <ArgonBox mr={2}>
                                <ArgonAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
                            </ArgonBox>
                            <ArgonTypography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
                                {row[name][1]}
                            </ArgonTypography>
                        </ArgonBox>
                    </ArgonBox>
                );
            } else {
                template = (
                    <ArgonBox
                        key={uuidv4()}
                        component="td"
                        p={1}
                        textAlign={align}
                        verticalAlign="middle"
                        lineHeight={0.65}
                        sx={({ palette: { light } }) => ({
                            borderBottom: row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null,
                        })}
                    >
                        <ArgonTypography
                            variant="button"
                            fontWeight="regular"
                            color="secondary"
                            sx={{ display: "inline-block", width: "max-content" }}
                        >
                            {name === "action" ? <ArgonBox component="td" p={1} textAlign="center">
                                <ActionButton isOpened={expandedRow === rowKey} onClick={() => handleExpandClick(rowKey)} item={row.item} />
                            </ArgonBox> : row[name]}
                        </ArgonTypography>
                    </ArgonBox>
                );
            }

            return template;
        });

        return (
            <React.Fragment key={rowKey}>
                <TableRow>
                    {tableRow}
                </TableRow>
                <TableRow>
                    <ArgonBox component="td" colSpan={columns.length + 1}>
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                            <SubTable    gridSize={{ xs: 10 }} subData={row.subData} />
                        </Collapse>
                    </ArgonBox>
                </TableRow>
               
            </React.Fragment>
        );
    });

    return useMemo(
        () => (
            <TableContainer>
                <MuiTable>
                    <ArgonBox component="thead">
                        <TableRow>{renderColumns}</TableRow>
                    </ArgonBox>
                    <TableBody>{renderRows}</TableBody>
                </MuiTable>
                <ServerSidePagination data={data} setPageNo={setPageNo} />
            </TableContainer>
        ),
        [data,setPageNo,renderColumns,renderRows]
    );
}

export default ViewAuditTable;