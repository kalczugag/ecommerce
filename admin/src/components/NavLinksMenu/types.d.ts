export interface NavLink {
    key: string;
    label: string;
    to?: string;
    icon?: JSX.Element;
    subLinks?: NavLink[];
    onClick?: () => void;
}

export interface NavLinksMenuProps {
    links: {
        sectionLabel: string;
        elements: NavLink[];
    }[];
    fontSize?: "small" | "medium" | "large";
}
