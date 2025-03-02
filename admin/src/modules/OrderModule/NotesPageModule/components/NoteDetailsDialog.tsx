import { useState } from "react";
import { Form } from "react-final-form";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
} from "@mui/material";
import type { OrderNote } from "@/types/Order";

interface NoteDetailsDialogProps {
    data: OrderNote;
    isOpen: boolean;
    handleClose: () => void;
}

const NoteDetailsDialog = ({
    data,
    isOpen,
    handleClose,
}: NoteDetailsDialogProps) => {
    const [editMode, setEditMode] = useState(false);

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth>
            <Form
                onSubmit={handleSubmit}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Edit Note</DialogTitle>
                        <DialogContent>
                            <DialogContentText className="flex flex-col">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">
                                        Description
                                    </span>
                                    <Button color="inherit" variant="outlined">
                                        Edit
                                    </Button>
                                </div>
                                <Divider sx={{ my: 1 }} />
                                <span className="px-2">{data.text}</span>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="info">
                                Cancel
                            </Button>
                            <Button type="submit" color="info">
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                )}
            />
        </Dialog>
    );
};

export default NoteDetailsDialog;
