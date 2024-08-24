import { Link, useLocation } from "react-router-dom";
import useIsMobile from "@/hooks/useIsMobile";
import { useAppSelector, useAppDispatch } from "@/hooks/useStore";
import { toggleSidebar } from "@/store";
import { Drawer } from "@mui/material";
import { Adb } from "@mui/icons-material";
import TitledIconButton from "../TitledIconButton";

const Sidebar = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const { content, isOpen } = useAppSelector((state) => state.sidebar);

    const isMobile = useIsMobile();

    const handleClick = () => {
        if (isMobile) {
            dispatch(toggleSidebar(false));
        }
    };

    const sidebarContent = (
        <div className="flex-col py-6 h-screen w-[215.156px] bg-dark-primary text-text-dark dark:bg-darker">
            <div className="flex items-center px-6 mb-10">
                <Adb className="mr-1" />
                <Link
                    to="/"
                    onClick={handleClick}
                    className="font-mono font-bold text-xl tracking-[.3rem] no-underline"
                >
                    LOGO
                </Link>
            </div>
            <div className="flex flex-col space-y-2">
                {content.map((item, index) => (
                    <TitledIconButton
                        key={item.label + "_" + index}
                        {...item}
                        active={pathname === item.to}
                        handleClick={handleClick}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <>
            {isMobile ? (
                <Drawer
                    anchor="left"
                    open={isOpen}
                    onClose={() => dispatch(toggleSidebar(false))}
                >
                    {sidebarContent}
                </Drawer>
            ) : (
                sidebarContent
            )}
        </>
    );
};

export default Sidebar;
