import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CircularProgress from '@mui/material/CircularProgress';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

interface Props {
    open: boolean, 
    handleClose: ()=>void, 
    handleClickOpen: ()=>void
    loading: boolean, 
    text: string

}

const AlertDialog = ({open, handleClose, handleClickOpen, loading, text}: Props)=> {
   
    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
         
          <DialogContent>
          {loading && <CircularProgress/>}
           {!loading && <DialogContentText id="alert-dialog-description" sx={{ fontWeight: 500 }}>
                {text}
            </DialogContentText>}
          </DialogContent>
          {!loading && <DialogActions>
            <Button onClick={handleClose}>Go to Login Page</Button>
          </DialogActions>}
        </Dialog>
      </>
    );
  }

export default AlertDialog;