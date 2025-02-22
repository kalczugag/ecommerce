import { useState } from "react";
import { Field, Form } from "react-final-form";
import { useGetDeliveryMethodsQuery } from "@/store/apis/deliveryMethods";
import { required } from "@/utils/validators";
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
    FormHelperText,
    InputLabel,
    ListSubheader,
    MenuItem,
    Select,
} from "@mui/material";
import TooltipButton from "@/components/TooltipButton";

interface ChangeShippingMethodDialogProps {
    trackingNumber?: string;
    currentDeliveryMethod?: string;
    methodName: string;
}

const ChangeShippingMethodDialog = ({
    trackingNumber,
    currentDeliveryMethod,
    methodName,
}: ChangeShippingMethodDialogProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const { data, isLoading } = useGetDeliveryMethodsQuery(undefined, {
        skip: !isOpen,
    });

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleSubmit = (values: { shippingMethod: string }) => {
        console.log(values.shippingMethod);
        handleClose();
    };

    return (
        <>
            <TooltipButton
                title="Change Method"
                tooltipText="Cannot change shipping method after items have been shipped"
                variant="outlined"
                onClick={handleOpen}
                disabled={isLoading || Boolean(trackingNumber)}
            />
            <Dialog open={isOpen} onClose={handleClose}>
                <Form
                    initialValues={{
                        shippingMethod: currentDeliveryMethod || "",
                    }}
                    onSubmit={handleSubmit}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <DialogTitle>Change Shipping Method</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    After changing this informaiton, you may
                                    need to recalculate shipping charges.
                                </DialogContentText>
                            </DialogContent>
                            <DialogContent className="space-y-4">
                                <DialogContentText>
                                    <span className="font-semibold">
                                        Current Method:{" "}
                                    </span>
                                    <span>{methodName}</span>
                                </DialogContentText>
                                <Field
                                    name="shippingMethod"
                                    type="select"
                                    validate={required}
                                >
                                    {(props) => (
                                        <FormControl
                                            disabled={isLoading}
                                            sx={{ minWidth: 200 }}
                                        >
                                            <InputLabel
                                                error={
                                                    props.meta.error &&
                                                    props.meta.touched
                                                }
                                            >
                                                New Method
                                            </InputLabel>
                                            <Select
                                                {...props.input}
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
                                                error={
                                                    props.meta.error &&
                                                    props.meta.touched
                                                }
                                            >
                                                <MenuItem value="">
                                                    None
                                                </MenuItem>
                                                <Divider />
                                                {data?.result &&
                                                    data.result.map(
                                                        (deliveryMethod) => [
                                                            <ListSubheader
                                                                key={
                                                                    deliveryMethod._id
                                                                }
                                                            >
                                                                {
                                                                    deliveryMethods[
                                                                        deliveryMethod
                                                                            .type
                                                                    ]
                                                                }
                                                            </ListSubheader>,
                                                            ...deliveryMethod.providers.map(
                                                                (provider) => (
                                                                    <MenuItem
                                                                        key={
                                                                            provider._id
                                                                        }
                                                                        value={
                                                                            provider._id
                                                                        }
                                                                    >
                                                                        {`${provider.name} - $${provider.price}`}
                                                                    </MenuItem>
                                                                )
                                                            ),
                                                        ]
                                                    )}
                                            </Select>
                                            {props.meta.error &&
                                                props.meta.touched && (
                                                    <FormHelperText error>
                                                        Select shipping method
                                                    </FormHelperText>
                                                )}
                                        </FormControl>
                                    )}
                                </Field>
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
        </>
    );
};

export default ChangeShippingMethodDialog;
