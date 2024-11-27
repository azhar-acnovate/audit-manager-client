import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';
import Loading from './Loading/Loading';

export default function SimpleBackdrop({loading}) {
  // const [open] = React.useState(true);
  // const handleClose = () => {
  //   setOpen(false);
  // };
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        {/* <CircularProgress color="inherit" /> */}
        <Loading></Loading>
      </Backdrop>
    </div>
  );
}