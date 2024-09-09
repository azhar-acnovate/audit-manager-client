import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import ArgonBox from '../../../components/ArgonBox';
import typography from '../../../assets/theme/base/typography';
import borders from '../../../assets/theme/base/borders';
import ArgonTypography from '../../../components/ArgonTypography';

function SubTable({ subData }) {
    var paddingSize = '5px'
    const { size, fontWeightBold } = typography;
    const { borderWidth } = borders;
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

                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Typography variant='h5' px={3} >History</Typography>
                            <Table sx={{ minWidth: 100 }} aria-label="simple table">
                                <TableBody sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableRow>
                                        {getHeaderColumn('Attribute Name', 'left')}
                                        {getHeaderColumn('Old Value', 'center')}
                                        {getHeaderColumn('New Value', 'center')}
                                        {getHeaderColumn('Changed By', 'center')}
                                        

                                    </TableRow>
                                    {subData.map((item, index) => (
                                        <TableRow key={index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell sx={{ padding: paddingSize, textAlign: 'left' }}>
                                                <ArgonTypography px={4} variant="caption" color="secondary" fontWeight="medium">
                                                    {item.attributeName.toUpperCase()}
                                                </ArgonTypography>
                                            </TableCell>
                                            <TableCell sx={{ padding: paddingSize, textAlign: 'center' }}>
                                                <ArgonTypography px={4} variant="caption" color="warning" fontWeight="medium">
                                                    {item.oldValue}
                                                </ArgonTypography>
                                            </TableCell>
                                            <TableCell sx={{ padding: paddingSize, textAlign: 'center' }}>
                                                <ArgonTypography px={4} variant="caption" color="success" fontWeight="medium">
                                                    {item.newValue}
                                                </ArgonTypography>
                                            </TableCell>
                                            <TableCell sx={{ padding: paddingSize, textAlign: 'center' }}>
                                                <ArgonTypography px={4} variant="caption" color="success" fontWeight="medium">
                                                    {item.changedBy}
                                                </ArgonTypography>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </>
    );
}

export default SubTable;