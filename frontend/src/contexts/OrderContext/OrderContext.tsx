import { createContext, ReactNode } from "react";
import type { Order } from "@/types/Order";

export interface OrderContextProps {
    order?: Order;
    steps: string[];
    isLoading: boolean;
    isError: boolean;
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
}

export const OrderProvider = ({
    children,
    order,
    isLoading,
    isError,
    steps,
}: OrderProviderProps) => (
    <OrderContext.Provider value={{ order, isLoading, isError, steps }}>
        {children}
    </OrderContext.Provider>
);
