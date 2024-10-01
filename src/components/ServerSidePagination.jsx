import { Box, Pagination, PaginationItem } from '@mui/material';
import React from 'react';

const ServerSidePagination = ({ data, setPageNo }) => {

    const handlePageChange = (page) => {

        setPageNo(page);
    };

    if (data == null || data.content ==null || data.content.length === 0) {
        return null;
    }

    let pageNumber = data.pageable.pageNumber;
    let totalPages = data.totalPages;

    // Define the range of pages to display
    const displayRange = 5;
    const startPage = Math.max(0, pageNumber - Math.floor(displayRange / 2));
    const endPage = Math.min(totalPages, startPage + displayRange);
    const adjustedStartPage = Math.max(0, endPage - displayRange);

    const pageNumbers = [];
    for (let i = adjustedStartPage; i < endPage; i++) {
        pageNumbers.push(i);
    }

    return (

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination
            sx={{ p: 2,paddingRight:10 }}
            variant="outlined"
            color="info"
            count={totalPages}
            page={pageNumber + 1}
            onChange={(event, value) => handlePageChange(value)}
            renderItem={(item) => (
                <PaginationItem  {...item} />
            )}
            siblingCount={1} // Customize as per need
            boundaryCount={1} // Customize as per need
            showFirstButton
            showLastButton
        />
    </Box>
    
    );
};

export default ServerSidePagination;
