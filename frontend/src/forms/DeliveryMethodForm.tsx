import { Field } from "react-final-form";
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import type { Order, ShippingAddress } from "@/types/Order";
import { ReactNode } from "react";

export interface DeliveryMethodContentProps {
    label: string;
    items: {
        _id: string;
        topLabel?: string;
        label?: string;
        price: number;
        expectedDelivery?: Date;
        description?: string;
        address?: ShippingAddress;
        expendable?: ReactNode;
    }[];
}

interface DeliveryMethodFormProps {
    content: DeliveryMethodContentProps[];
    isLoading: boolean;
}

interface ListItemProps {
    _id: string;
    topLabel: string;
    label?: string;
    price: number;
    expectedDelivery?: Date;
    description?: string;
    address?: ShippingAddress;
    expendable?: ReactNode;
}

{
    /* <div className="flex flex-col">
    <p>{name}</p>
    <p>{address?.street}</p>
    <p>
        {address?.postalCode} {address?.city}, {address?.country}
    </p>
    </div>; */
}

const ListItem = ({
    _id,
    topLabel,
    label,
    price,
    expectedDelivery,
    description,
    address,
}: ListItemProps) => {
    return (
        <div className="flex flex-col">
            <p>
                {topLabel}{" "}
                <span className="text-sm text-gray-600">
                    {label && label}{" "}
                    {address && `${address.street}, ${address.city}`}
                </span>
            </p>
            {description && (
                <p className="text-sm text-gray-600">{description}</p>
            )}
        </div>
    );
};

const DeliveryMethodForm = ({
    content,
    isLoading,
}: DeliveryMethodFormProps) => {
    return (
        <FormControl disabled={isLoading}>
            <Field name="deliveryMethod" type="radio">
                {({ input }) => (
                    <div className="space-y-4">
                        {content.map((wrap) => (
                            <RadioGroup
                                value={input.value}
                                onChange={input.onChange}
                            >
                                <h3 className="text-lg font-semibold">
                                    {wrap.label}
                                </h3>
                                {wrap.items.map((item) => {
                                    const titleVariant =
                                        wrap.value === "homeDelivery" ? (
                                            <ListItem
                                                topLabel="Courier"
                                                {...item}
                                            />
                                        ) : wrap.value === "pickupPoint" ? (
                                            <ListItem
                                                topLabel="Pickup"
                                                {...item}
                                            />
                                        ) : (
                                            <ListItem
                                                topLabel="Store"
                                                {...item}
                                            />
                                        );

                                    return (
                                        <div className="flex flex-row items-center justify-between">
                                            <FormControlLabel
                                                key={item.label}
                                                value={item.value}
                                                control={<Radio />}
                                                label={titleVariant}
                                            />
                                            <span>
                                                ${item.price.toFixed(2)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </RadioGroup>
                        ))}
                    </div>
                )}
            </Field>
        </FormControl>
    );
};

export default DeliveryMethodForm;
