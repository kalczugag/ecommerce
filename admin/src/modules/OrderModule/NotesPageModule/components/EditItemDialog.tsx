import { Form } from "react-final-form";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import type { OrderNote } from "@/types/Order";

interface EditItemDialogProps {
    data: OrderNote;
    isOpen: boolean;
    handleClose: () => void;
}

const EditItemDialog = ({ data, isOpen, handleClose }: EditItemDialogProps) => {
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <Form
                onSubmit={handleSubmit}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Edit Note</DialogTitle>
                        <DialogContent>noteId: {data._id}</DialogContent>
                    </form>
                )}
            />
        </Dialog>
    );
};

export default EditItemDialog;
