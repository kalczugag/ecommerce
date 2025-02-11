import moment from "moment";
import { useUpdateOrderMutation } from "@/store";
import { enqueueSnackbar } from "notistack";
import { orderStatuses } from "@/constants/orderStatuses";
import DetailCard from "@/components/DetailCard";
import Contact from "./Contact";
import { Field, Form } from "react-final-form";
import { FormControl, MenuItem, Select } from "@mui/material";
import type { Order, UpdateOrder } from "@/types/Order";

interface BillingCardProps {
    data: Order;
}

const BillingCard = ({ data }: BillingCardProps) => {
    const [updateOrder, { isLoading }] = useUpdateOrderMutation();

    const handleSubmit = async (values: UpdateOrder) => {
        try {
            await updateOrder({
                _id: data._id || "",
                status: values.status,
            }).unwrap();
            enqueueSnackbar("Order status updated successfully", {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar("Failed to update order status", {
                variant: "error",
            });
        }
    };

    return (
        <DetailCard label="Billing">
            <div>
                <span className="font-bold">Order Date: </span>
                <span>
                    {moment(data.createdAt).format("DD/MM/YYYY, HH:mm")}
                </span>
            </div>
            <div className="space-y-1">
                <span className="font-bold">Order Status: </span>
                <Form
                    initialValues={{ status: data.status }}
                    onSubmit={handleSubmit}
                    render={({ handleSubmit, form }) => (
                        <form onSubmit={handleSubmit}>
                            <Field name="status" type="select">
                                {({ input }) => (
                                    <FormControl fullWidth>
                                        <Select
                                            {...input}
                                            onChange={(e) => {
                                                input.onChange(e.target.value);
                                                form.submit();
                                            }}
                                            disabled={isLoading}
                                        >
                                            {Object.entries(orderStatuses).map(
                                                ([key, value]) => (
                                                    <MenuItem
                                                        key={key}
                                                        value={key}
                                                    >
                                                        {value}
                                                    </MenuItem>
                                                )
                                            )}
                                        </Select>
                                    </FormControl>
                                )}
                            </Field>
                        </form>
                    )}
                />
            </div>
            <Contact
                address={data.billingAddress}
                contact={{
                    fullName:
                        data._user?.firstName + " " + data._user?.lastName,
                    email: data._user?.email,
                    phone: data._user?.phone,
                }}
            />
        </DetailCard>
    );
};

export default BillingCard;
