import { Fragment, useState } from "react";
import { Field } from "react-final-form";
import { useGetDeliveryMethodsQuery } from "@/store/apis/deliveryMethods";
import { deliveryMethods } from "@/constants/deliveryMethods";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    InputLabel,
    ListSubheader,
    MenuItem,
    Select,
} from "@mui/material";

interface ChangeShippingMethodDialogProps {
    methodName: string;
    onChangeMethod: () => void;
}

const ChangeShippingMethodDialog = ({
    methodName,
    onChangeMethod,
}: ChangeShippingMethodDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading } = useGetDeliveryMethodsQuery(undefined, {
        skip: !isOpen,
    });

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <Button variant="outlined" onClick={handleOpen}>
                Change Method
            </Button>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Change Shipping Method</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        After changing this informaiton, you may need to
                        recalculate shipping charges.
                    </DialogContentText>
                </DialogContent>
                <DialogContent className="space-y-4">
                    <DialogContentText>
                        <span className="font-semibold">Current Method: </span>
                        <span>{methodName}</span>
                    </DialogContentText>
                    <Field name="shippingMethod" type="select">
                        {({ input }) => (
                            <FormControl
                                disabled={isLoading}
                                sx={{ minWidth: 200 }}
                            >
                                <InputLabel>New Method</InputLabel>
                                <Select
                                    {...input}
                                    label="New Method"
                                    MenuProps={{
                                        slotProps: {
                                            paper: {
                                                style: {
                                                    maxHeight: 300,
                                                },
                                            },
                                        },
                                    }}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    <Divider />
                                    {data &&
                                        data.map((deliveryMethod) => (
                                            <Fragment key={deliveryMethod._id}>
                                                <ListSubheader>
                                                    {
                                                        deliveryMethods[
                                                            deliveryMethod.type
                                                        ]
                                                    }
                                                </ListSubheader>
                                                {deliveryMethod.providers.map(
                                                    (provider) => (
                                                        <MenuItem
                                                            key={provider._id}
                                                            value={provider._id}
                                                        >
                                                            {`${provider.name} - $${provider.price}`}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Fragment>
                                        ))}
                                    <ListSubheader>
                                        Unavailable for customers
                                    </ListSubheader>
                                    <MenuItem value="free">
                                        ** Free shipping
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    </Field>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="info">
                        Cancel
                    </Button>
                    <Button onClick={onChangeMethod} color="info">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ChangeShippingMethodDialog;
