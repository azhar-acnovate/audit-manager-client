import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Pagination, PaginationItem, Menu, MenuItem, Grid, Typography } from '@mui/material';
import React from 'react';

function getTotalPages(size, total) {
    return size === 0 ? 1 : Math.ceil(total / size);
}

const ClientSidePagination = ({ totalSize, usePage, useRowsPerPage }) => {
    const [pageNo, setPageNo] = usePage;
    const [rowsPerPage, setRowsPerPage] = useRowsPerPage;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (value) => {
        setAnchorEl(null);
        if (value != null) {
            setRowsPerPage(value);
            setPageNo(1); // Reset to the first page when rows per page changes
        }
    };

    const handlePageChange = (event, value) => {
        setPageNo(value);
    };

    if (totalSize == null || totalSize === 0) {
        return null;
    }

    let pageNumber = pageNo - 1;
    let totalPages = getTotalPages(rowsPerPage, totalSize);

    // Array for dropdown options (rows per page)
    const rowsPerPageOptions = [3, 5, 10, 20, 50];
    
    return (
        <Grid paddingLeft={1} container direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            {/* Dropdown for Rows per page */}
            <Grid item xs={12} sm={5} md={4}>
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
                    <Grid item>
                        <Typography sx={{ fontSize: '0.9rem', marginRight: 1 }}>Rows per page:</Typography>
                    </Grid>
                    <Grid item>

                        <div
                            onClick={handleClick}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }}>
                            <Typography sx={{ fontSize: '1rem' }}>{rowsPerPage}</Typography>
                            {!open ? <ArrowDropDown /> : <ArrowDropUp />}

                        </div>

                    </Grid>
                </Grid>

                <Menu
                    id="demo-customized-menu"
                    anchorEl={anchorEl}
                    open={open}

                    onClose={() => handleClose(null)}
                    sx={{
                        '& .MuiPaper-root': {
                          //  borderRadius: 6,
                          width: '20px',
                            minWidth: 60,
                        }
                    }}
                    // MenuListProps={{
                    //     'aria-labelledby': 'basic-button',
                    // }}
               
                >
                    {rowsPerPageOptions.map((option) => (
                        <MenuItem onClick={() => handleClose(option)} key={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </Grid>

            {/* Pagination */}
            <Grid item xs={12} sm={7} md={8}>
                <Pagination
                    sx={{ p: 2 }}
                    variant="outlined"
                    color="info"
                    count={totalPages}
                    page={pageNumber + 1}
                    onChange={handlePageChange}
                    renderItem={(item) => <PaginationItem  {...item} />}
                    siblingCount={1}
                    boundaryCount={1}
                    showFirstButton
                    showLastButton
                />
            </Grid>
        </Grid>
    );
};

export default ClientSidePagination;
