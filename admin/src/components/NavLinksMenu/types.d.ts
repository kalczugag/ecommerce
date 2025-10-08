export interface NavLink {
    key: string;
    label: string;
    to?: string;
    icon?: JSX.Element;
    subLinks?: NavLink[];
    onClick?: () => void;
}

export interface NavLinkSection {
    sectionLabel: string;
    elements: NavLink[];
}

export interface NavLinksMenuProps {
    links: NavLinkSection[];
    fontSize?: "small" | "medium" | "large";
}
