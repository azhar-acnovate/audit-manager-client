import React, { useMemo } from "react"
import ArgonBox from "../../components/ArgonBox";
import ArgonTypography from "../../components/ArgonTypography";
import {  Table as MuiTable, TableBody, TableContainer, TableRow } from "@mui/material";
import borders from "../../assets/theme/base/borders";
import pxToRem from "../../assets/theme/functions/pxToRem";
import typography from "../../assets/theme/base/typography";
// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";
import ServerSidePagination from "../../components/ServerSidePagination";
import ActionButton from "./components/ActionButton";

const SourceReferenceTable = ({ columns, rows, data, setPageNo }) => {
 
    const { borderWidth } = borders;
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

        const tableRow = columns.map(({ name, align }) => {


            return <ArgonBox
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
                            <ActionButton onClick={() => {}} item={row.item} />
                        </ArgonBox> : row[name]}
                </ArgonTypography>
            </ArgonBox>;
        });

        return (
            <React.Fragment key={rowKey}>
                <TableRow>
                    {tableRow}
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
};

export default SourceReferenceTable;
