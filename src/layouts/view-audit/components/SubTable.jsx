import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableRow, Typography, Grid, Card, CardContent, Icon } from '@mui/material';
import ArgonBox from '../../../components/ArgonBox';
import typography from '../../../assets/theme/base/typography';
import ArgonTypography from '../../../components/ArgonTypography';
import ArgonInput from '../../../components/ArgonInput';
import ClientSidePagination from '../../../components/ClientSidePagination';

export const subTablePaddingSize = '5px';

function SubTable({ subData, gridSize = { xs: 8 }, title = "History", actions }) {
    const [filterText, setFilterText] = useState('');
    const [filteredData, setFilteredData] = useState(subData);
    const [pageNo,setPageNo] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { size, fontWeightBold } = typography;

    // Update filteredData based on filterText
    React.useEffect(() => {
        const lowercasedFilterText = filterText.toLowerCase();
        const newFilteredData = subData.filter(item =>
            item.attributeName.toLowerCase().includes(lowercasedFilterText) ||
            item.oldValue.toLowerCase().includes(lowercasedFilterText) ||
            item.newValue.toLowerCase().includes(lowercasedFilterText) ||
            item.changedBy.toLowerCase().includes(lowercasedFilterText)
        );
        setFilteredData(newFilteredData);
    }, [filterText, subData]);

  
 
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
                fontSize={size.sm}
                fontWeight={fontWeightBold}
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
            <Grid
                container
                direction="row"
                sx={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <Grid item xs={gridSize.xs}>
                    <Card>
                        <CardContent>
                            {title && <Grid container
                                direction="row"
                                sx={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                <Grid item><Typography variant='h5' px={3} >{title}</Typography></Grid>
                                <Grid item>
                                    <ArgonInput
                                        placeholder="Search"
                                        value={filterText}
                                        onChange={(e) => setFilterText(e.target.value)}
                                        startAdornment={
                                            <Icon fontSize="small" style={{ marginRight: "6px" }}>
                                                search
                                            </Icon>
                                        }
                                    />
                                </Grid>
                            </Grid>
                            }

                            <Table sx={{ minWidth: 100 }} aria-label="simple table">
                                <TableBody sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableRow>
                                        {getHeaderColumn('Attribute Name', 'left')}
                                        {getHeaderColumn('Old Value', 'center')}
                                        {getHeaderColumn('New Value', 'center')}
                                        {getHeaderColumn('Changed By', 'center')}
                                        {actions && getHeaderColumn('Action', 'center')}
                                    </TableRow>
                                    {filteredData && filteredData
                                        .slice((pageNo - 1) * rowsPerPage, pageNo * rowsPerPage)
                                        .map((item, index) => {
                                            const isChanged =item.oldValue!=="" && item.oldValue !== item.newValue;

                                            return (
                                                <TableRow key={index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell sx={{ padding: subTablePaddingSize, textAlign: 'left' }}>
                                                        <ArgonTypography px={4} variant="caption" color="secondary" fontWeight="medium">
                                                            {item.attributeName.toUpperCase()}
                                                        </ArgonTypography>
                                                    </TableCell>
                                                    <TableCell sx={{ padding: subTablePaddingSize, textAlign: 'center' }}>
                                                        <ArgonTypography px={4} variant="caption" color={isChanged ? "warning" : "secondary"} fontWeight="medium">
                                                            {item.oldValue}
                                                        </ArgonTypography>
                                                    </TableCell>
                                                    <TableCell sx={{ padding: subTablePaddingSize, textAlign: 'center' }}>
                                                        <ArgonTypography px={4} variant="caption" color={isChanged ? "success" : "secondary"} fontWeight="medium">
                                                            {item.newValue}
                                                        </ArgonTypography>
                                                    </TableCell>
                                                    <TableCell sx={{ padding: subTablePaddingSize, textAlign: 'center' }}>
                                                        <ArgonTypography px={4} variant="caption" color="secondary" fontWeight="medium">
                                                            {item.changedBy}
                                                        </ArgonTypography>
                                                    </TableCell>
                                                    {actions && actions(item, index)}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <ClientSidePagination
                    totalSize={filteredData!=null?filteredData.length:0}
                    usePage={[pageNo,setPageNo]}
                    useRowsPerPage={[rowsPerPage, setRowsPerPage]}

                    ></ClientSidePagination>
                </Grid>
            </Grid>
        </>
    );
}

export default SubTable;
