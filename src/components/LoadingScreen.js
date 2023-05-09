import React from 'react';
import '../styles/LoadingScreen.css';
import { Backdrop, CircularProgress } from '@mui/material';

const LoadingScreen = () => {
  return (
    <Backdrop open={true}>
      <CircularProgress sx={{ color: 'primary.light'}} size={60} />
    </Backdrop>
  );
};

export default LoadingScreen;
