import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { useMediaQuery } from "@mui/material";
import type { NavLinksMenuProps } from "./types";

const NavLinksMenu = (props: NavLinksMenuProps) => {
    const isMobile = useMediaQuery("(max-width: 1024px)");

    return isMobile ? <MobileMenu {...props} /> : <DesktopMenu {...props} />;
};

export default NavLinksMenu;
