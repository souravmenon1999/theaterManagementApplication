import React, { useState } from 'react';
import { useAppSelector } from '@/library/hooks';
import { Theater } from '@/library/types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SeatMatrix from '@/components/seating/layout';

interface TheaterDetailsProps {
  theaterId: string;
}

const TheaterDetails = ({ theaterId }: TheaterDetailsProps) => {
  const dashBoardData = useAppSelector((state) => state.theaterDetails);
  const theater = dashBoardData.theaters.find((t: Theater) => t._id === theaterId);

  const [open, setOpen] = useState(false); // State for Dialog

  // Open/Close handlers for dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log('closed');
  };

  if (!theater) {
    return <div>Select a theater to view details</div>;
  }

  return (
    <div style={{ border: '1px solid black', padding: '10px', marginTop: '20px' }}>
      <h2>{theater.theaterName}</h2>
      <p>Address: {theater.address}</p>
      <p>Owner ID: {theater.ownerID}</p>
      <p>Screen IDs: {theater.screenIDs.join(', ')}</p>
      <p> theater Id: {theater._id}</p>
      
      {/* Button to open the dialog */}
      <Button 
        variant="outlined" 
        onClick={handleClickOpen}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add Screen
      </Button>

      <SeatMatrix open={open} handleClose={handleClose} id={theater._id} />
    
    </div>
  );
};

export default TheaterDetails;
