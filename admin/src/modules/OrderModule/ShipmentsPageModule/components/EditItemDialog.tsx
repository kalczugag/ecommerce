import { useState } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { compose, minValue, mustBeNumber, required } from "@/utils/validators";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { Edit, RestartAlt } from "@mui/icons-material";
import { Item } from "@/types/Order";
import { useGetProductByIdQuery } from "@/store";

interface EditItemDialogProps {
    item: Item;
}

const EditItemDialog = ({ item }: EditItemDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading } = useGetProductByIdQuery({
        id: item._product._id || "",
        params: { select: "size,color" },
    });

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleSubmit = (values: any) => {
        console.log(values);
        handleClose();
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <Edit />
            </IconButton>
            <Dialog open={isOpen} onClose={handleClose}>
                <Form
                    initialValues={item}
                    onSubmit={handleSubmit}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <DialogTitle>Edit Item</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Ensure all updates are accurate, as changes
                                    may impact order fulfillment and invoicing.
                                </DialogContentText>
                            </DialogContent>
                            <DialogContent className="flex flex-row justify-between">
                                <div className="flex-1 flex flex-col space-y-4">
                                    <Field
                                        name="total"
                                        validate={compose(
                                            minValue(0),
                                            required
                                        )}
                                    >
                                        {(props) => (
                                            <TextField
                                                {...props.input}
                                                value={props.input.value.toFixed(
                                                    2
                                                )}
                                                type="number"
                                                label="Price"
                                                slotProps={{
                                                    htmlInput: {
                                                        step: 0.05,
                                                    },
                                                    input: {
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                $
                                                            </InputAdornment>
                                                        ),
                                                        endAdornment: (
                                                            <FormSpy
                                                                subscription={{
                                                                    initialValues:
                                                                        true,
                                                                }}
                                                            >
                                                                {({
                                                                    form,
                                                                    initialValues,
                                                                }) =>
                                                                    props.input
                                                                        .value !==
                                                                        initialValues.total && (
                                                                        <IconButton
                                                                            onClick={() =>
                                                                                form.change(
                                                                                    "total",
                                                                                    initialValues.total
                                                                                )
                                                                            }
                                                                        >
                                                                            <RestartAlt />
                                                                        </IconButton>
                                                                    )
                                                                }
                                                            </FormSpy>
                                                        ),
                                                    },
                                                }}
                                                onChange={(e) =>
                                                    props.input.onChange(
                                                        parseFloat(
                                                            e.target.value
                                                        )
                                                    )
                                                }
                                                error={
                                                    props.meta.error &&
                                                    props.meta.touched
                                                }
                                                helperText={
                                                    props.meta.error &&
                                                    props.meta.touched
                                                        ? props.meta.error
                                                        : null
                                                }
                                            />
                                        )}
                                    </Field>

                                    <Field name="quantity" validate={required}>
                                        {(props) => (
                                            <TextField
                                                {...props.input}
                                                label="Quantity"
                                                type="number"
                                                error={
                                                    props.meta.error &&
                                                    props.meta.touched
                                                }
                                                helperText={
                                                    props.meta.error &&
                                                    props.meta.touched
                                                        ? props.meta.error
                                                        : null
                                                }
                                            />
                                        )}
                                    </Field>
                                </div>

                                <Divider
                                    orientation="vertical"
                                    sx={{ marginX: 4 }}
                                    flexItem
                                />

                                <div className="flex-1 flex flex-col space-y-4">
                                    <Field name="size" validate={required}>
                                        {(props) => (
                                            <TextField
                                                {...props.input}
                                                label="Size"
                                                error={
                                                    props.meta.error &&
                                                    props.meta.touched
                                                }
                                                helperText={
                                                    props.meta.error &&
                                                    props.meta.touched
                                                        ? props.meta.error
                                                        : null
                                                }
                                            />
                                        )}
                                    </Field>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="info">
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    color="info"
                                    disabled={isLoading}
                                >
                                    Save
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                />
            </Dialog>
        </>
    );
};

export default EditItemDialog;
