import { createContext, ReactNode, useRef } from "react";
import type { Order } from "@/types/Order";

export interface OrderContextProps {
    order?: Order;
    steps: string[];
    isLoading: boolean;
    isError: boolean;
    onStripeRedirect?: () => void;
}

export const OrderContext = createContext<OrderContextProps | undefined>(
    undefined
);

interface OrderProviderProps {
    children: ReactNode;
    order?: Order;
    isLoading: boolean;
    isError: boolean;
    steps: string[];
    onStripeRedirect?: () => void;
}

export const OrderProvider = ({
    children,
    order,
    isLoading,
    isError,
    steps,
    onStripeRedirect,
}: OrderProviderProps) => {
    return (
        <OrderContext.Provider
            value={{
                order,
                isLoading,
                isError,
                steps,
                onStripeRedirect,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
};
