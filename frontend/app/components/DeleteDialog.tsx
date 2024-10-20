import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CircularProgress from '@mui/material/CircularProgress';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { error } from 'console';

interface Props {
    open: boolean, 
    handleClose: ()=>void,  
    investmentId: string ,
    refreshPage: ()=>void

}

const DeleteDialog = ({open, handleClose, investmentId, refreshPage }: Props)=> {

    const handleDelete = async()=>{
        try{
          const response = await  fetch(process.env.NEXT_PUBLIC_API_URL + '/investment/delete ', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({investmentId}),
          })
          if (!response){
            throw new Error("Error Deleting Investment");
          } 
          refreshPage();
          

        } catch(error){
          console.log(error);
        }
    }

    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
         <DialogTitle>
            Delete Investment
         </DialogTitle>
          <DialogContent>
        
        <DialogContentText id="alert-dialog-description" sx={{ fontWeight: 500 }}>
                Are you sure?
            </DialogContentText>
          </DialogContent>
       <DialogActions>
            <Button color='error' variant='contained' onClick={()=>{handleDelete();handleClose(); }}>Yes</Button>
            <Button onClick={handleClose} variant='contained'>No</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

export default DeleteDialog;