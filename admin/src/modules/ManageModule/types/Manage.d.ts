import { ReactNode } from "react";

export interface Manage {
    key: string;
    label: string;
    element: (props?: any) => JSX.Element;
}
