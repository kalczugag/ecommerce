import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { toggleSidebar } from "@/store";
import { Drawer } from "@mui/material";
import DesktopMenu from "./DesktopMenu";
import type { NavLinksMenuProps } from "./types";

const MobileMenu = ({ links, fontSize }: NavLinksMenuProps) => {
    const dispatch = useAppDispatch();
    const { isOpen } = useAppSelector((state) => state.sidebar);

    const toggleDrawer = (newOpen: boolean) => {
        dispatch(toggleSidebar(newOpen));
    };

    return (
        <Drawer anchor="left" open={isOpen} onClose={() => toggleDrawer(false)}>
            <DesktopMenu links={links} fontSize={fontSize} />
        </Drawer>
    );
};

export default MobileMenu;
