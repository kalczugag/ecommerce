export interface Content {
    key: string;
    label: string;
    children: ReactNode;
    icon?: JSX.Element;
}

export interface CrudContent {
    label: string;
    element: JSX.Element;
}

export interface SidebarContent {
    label: string;
    to: string;
    icon?: JSX.Element;
    active?: boolean;
    handleClick?: () => void;
}
