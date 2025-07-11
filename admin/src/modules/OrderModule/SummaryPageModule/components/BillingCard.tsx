import moment from "moment";
import { useEditOrderMutation } from "@/store";
import { enqueueSnackbar } from "notistack";
import { orderStatuses } from "@/constants/orderStatuses";
import DetailCard from "@/components/DetailCard";
import Contact from "./Contact";
import { Field, Form } from "react-final-form";
import { FormControl, MenuItem, Select } from "@mui/material";
import type { Order, UpdateOrder } from "@/types/Order";
import { useHandleMutation } from "@/hooks/useHandleMutation";

interface BillingCardProps {
    data: Order;
}

const BillingCard = ({ data }: BillingCardProps) => {
    const [editOrder, { isLoading }] = useEditOrderMutation();
    const { handleMutation } = useHandleMutation();

    const handleSubmit = async (values: UpdateOrder) => {
        handleMutation({
            values: {
                _id: data._id || "",
                status: values.status,
            },
            mutation: editOrder,
        });
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
