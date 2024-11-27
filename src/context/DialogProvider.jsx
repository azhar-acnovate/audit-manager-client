import React, { createContext, useState, useContext } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Button } from '@mui/material';
const DialogContext = createContext();


export function useDialog() {
    return useContext(DialogContext);
}
export function DialogProvider({ children }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [confirmLabel, setConfirmLabel] = useState('Confirm');
    const [cancelLabel, setCancelLabel] = useState('Cancel');
    const [onConfirm, setOnConfirm] = useState(null);

    const openDialog = (title, message,onConfirm, confirmLabel = 'Confirm', cancelLabel = 'Cancel') => {
        setTitle(title);
        setMessage(message);
        setConfirmLabel(confirmLabel);
        setCancelLabel(cancelLabel);
        setOnConfirm(onConfirm)
        setIsDialogOpen(true);
    };
    const handleConfirm = () => {
        // Perform delete action
        setIsDialogOpen(false);
        if(onConfirm!=null){
            onConfirm()
        }
       
    };
    const closeDialog = () => {
        setIsDialogOpen(false);
    };
    return (
        <>
            <DialogContext.Provider
                value={{ isDialogOpen, title, message, openDialog, closeDialog,confirmLabel,cancelLabel }}
            >
                <Dialog open={isDialogOpen} onClose={closeDialog}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        <p>{message}</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleConfirm} color="error">
                            {confirmLabel}
                        </Button>
                        <Button onClick={closeDialog} color="primary">
                            {cancelLabel}
                        </Button>
                    </DialogActions>
                </Dialog>
                {children}
            </DialogContext.Provider>
          
        </>
    )
};
