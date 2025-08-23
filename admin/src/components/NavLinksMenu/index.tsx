import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { useMediaQuery } from "@mui/material";

export interface NavLink {
    key: string;
    label: string;
    to?: string;
    icon?: JSX.Element;
    subLinks?: NavLink[];
    onClick?: () => void;
}

interface NavLinksMenuProps {
    links: {
        sectionLabel: string;
        elements: NavLink[];
    }[];
    fontSize?: "small" | "medium" | "large";
}

const NavLinksMenu = (props: NavLinksMenuProps) => {
    const isMobile = useMediaQuery("(max-width: 1024px)");

    return isMobile ? <MobileMenu {...props} /> : <DesktopMenu {...props} />;
};

export default NavLinksMenu;
