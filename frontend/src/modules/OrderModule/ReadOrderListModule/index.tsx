import { Field } from "react-final-form";
import { Checkbox, FormControlLabel } from "@mui/material";
import { orderStatuses } from "@/constants/orderStatuses";
import { placeholderArray } from "@/utils/helpers";
import DefaultLayout from "@/layouts/DefaultLayout";
import Filters from "@/components/Filters";
import OrderListItem from "./components/OrderListItem";
import type { Order } from "@/types/Order";

interface ReadOrderListModuleProps {
    data: Order[];
    isLoading: boolean;
}

const ReadOrderListModule = ({ data, isLoading }: ReadOrderListModuleProps) => {
    const orderValues = Object.values(orderStatuses);
    const placeholderData = placeholderArray(2);

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    const formElements = (
        <Field name="status" type="checkbox">
            {({ input }) => (
                <div className="flex flex-col">
                    {orderValues.map((status, index) => (
                        <FormControlLabel
                            key={status + "_" + index.toString()}
                            control={<Checkbox />}
                            name={input.name}
                            value={input.value}
                            onChange={() => input.onChange(status)}
                            label={status}
                            disabled={isLoading}
                        />
                    ))}
                </div>
            )}
        </Field>
    );

    return (
        <DefaultLayout direction="row" className="md:space-x-14">
            <div className="hidden md:block">
                <Filters
                    onSubmit={handleSubmit}
                    formElements={formElements}
                    label="Order Status"
                />
            </div>
            <div className="flex flex-col w-full space-y-28">
                {(isLoading ? placeholderData : data).map((order, index) => (
                    <OrderListItem
                        key={order?._id || "skeleton" + "_" + index}
                        data={order}
                        isLoading={isLoading}
                    />
                ))}
            </div>
        </DefaultLayout>
    );
};

export default ReadOrderListModule;
