import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableRow, Typography, Grid, Card, CardContent, Icon } from '@mui/material';
import ArgonBox from './ArgonBox';
import ArgonTypography from './ArgonTypography';
import ArgonInput from './ArgonInput';
import ClientSidePagination from './ClientSidePagination';


export const subTablePaddingSize = '5px';

function DynamicTable({
    data,
    columns,
    title = "Data Table",
    gridSize = { xs: 12 },
    actions
}) {
    const [filterText, setFilterText] = useState(null);
    const [filteredData, setFilteredData] = useState(data); // Initial value set to `data`
    const [pageNo, setPageNo] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    useEffect(() => {
        setFilteredData(data);
    }, [data]);
    // Update filteredData based on filterText and data changes
    useEffect(() => {
        if(filterText!=null){
            const lowercasedFilterText = filterText.toLowerCase();
            const newFilteredData = data.filter(row =>
                columns.some(column =>
                    row[column.field]?.toString().toLowerCase().includes(lowercasedFilterText)
                )
            );
            setFilteredData(newFilteredData);
        }
       
    }, [filterText, data, columns]); // Re-run when `data` changes

    const getHeaderColumn = (headerName, align) => {
        return (
            <ArgonBox
                component="th"
                width="auto"
                pt={1.5}
                pb={1.25}
                pl={3}
                pr={3}
                textAlign={align}
                fontSize="sm"
                fontWeight="bold"
                color="secondary"
                opacity={0.7}
                sx={({ palette: { light }, borders: { borderWidth } }) => ({
                    borderBottom: `${borderWidth[1]} solid ${light.main}`,
                })}
            >
                {headerName}
            </ArgonBox>
        );
    };

    return (
        <>
            <Grid container direction="row" sx={{ justifyContent: "flex-end", alignItems: "center" }}>
                <Grid item xs={gridSize.xs}>
                    <Card>
                        <CardContent>

                            <Grid container direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                                <Grid item>
                                    <Typography variant='h5' px={3}>{title??""}</Typography>
                                </Grid>
                                <Grid item>
                                    <ArgonInput
                                        placeholder="Search"
                                        value={filterText}
                                        onChange={(e) => setFilterText(e.target.value)}
                                        startAdornment={
                                            <Icon fontSize="small" style={{ marginRight: "6px" }}>search</Icon>
                                        }
                                    />
                                </Grid>
                            </Grid>


                            <Table sx={{ minWidth: 100 }} aria-label="simple table">
                                <TableBody sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableRow>
                                        {columns.map((col, index) => getHeaderColumn(col.headerName, col.align || 'left'))}
                                        {actions && getHeaderColumn('Action', 'center')}
                                    </TableRow>
                                    {filteredData
                                        .slice((pageNo - 1) * rowsPerPage, pageNo * rowsPerPage)
                                        .map((row, index) => (
                                            <TableRow key={index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                {columns.map((col, idx) => (
                                                    <TableCell key={idx} sx={{ padding: subTablePaddingSize, textAlign: col.align || 'left' }}>
                                                        <ArgonTypography px={4} variant="caption" color="secondary" fontWeight="medium">
                                                            {row[col.field]}
                                                        </ArgonTypography>
                                                    </TableCell>
                                                ))}
                                                {actions && actions(row, index)}
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <ClientSidePagination
                        totalSize={filteredData ? filteredData.length : 0}
                        usePage={[pageNo, setPageNo]}
                        useRowsPerPage={[rowsPerPage, setRowsPerPage]}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default DynamicTable;
