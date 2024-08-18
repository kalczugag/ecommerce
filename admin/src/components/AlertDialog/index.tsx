import { ReactNode, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

interface AlertDialogProps {
    title: string;
    content: string;
    confirm: string;
    cancel: string;
    onConfirm: () => void;
    children: (props: { open: () => void }) => ReactNode;
}

const AlertDialog = ({
    title,
    content,
    confirm,
    cancel,
    onConfirm,
    children,
}: AlertDialogProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = () => setIsOpen(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            {children({ open: handleOpen })}
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="info">
                        {cancel}
                    </Button>
                    <Button
                        onClick={() => {
                            onConfirm();
                            handleClose();
                        }}
                        color="info"
                    >
                        {confirm}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AlertDialog;
