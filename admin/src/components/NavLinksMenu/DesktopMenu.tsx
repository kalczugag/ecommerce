import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { toggleCollapsed, toggleSidebar } from "@/store";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, Divider, IconButton, useMediaQuery } from "@mui/material";
import Copyright from "../Copyright";
import MenuSection from "./MenuSection";
import type { NavLinksMenuProps, NavLink } from "./types";

const DesktopMenu = ({ links, fontSize = "medium" }: NavLinksMenuProps) => {
    const isMobile = useMediaQuery("(max-width: 1024px)");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { collapsed, isOpen } = useAppSelector((state) => state.sidebar);

    const [activeKeys, setActiveKeys] = useState<string[]>([]);

    useEffect(() => {
        if (isMobile && collapsed) dispatch(toggleCollapsed(false));
    }, [isMobile]);

    useEffect(() => {
        if (collapsed) setActiveKeys([]);
    }, [collapsed]);

    const toggleCollapse = () => dispatch(toggleCollapsed(!collapsed));
    const toggleDrawer = (open: boolean) => dispatch(toggleSidebar(open));
    const collapseAll = () => setActiveKeys([]);

    const handleClick = (link: NavLink, isSubLink = false) => {
        if (link.to) {
            if (isMobile && isOpen) toggleDrawer(false);
            if (link.to !== pathname) navigate(link.to);
            if (!isSubLink && (!link.subLinks || link.subLinks.length === 0))
                collapseAll();
        } else if (link.onClick) {
            link.onClick();
        } else {
            setActiveKeys((prev) =>
                prev.includes(link.key) ? [] : [link.key]
            );
        }
    };

    return (
        <Box
            width={collapsed ? 70 : 250}
            role="presentation"
            className="py-6 bg-dark-primary text-text-dark dark:bg-darker h-full relative transition-all duration-300"
        >
            {!isMobile && (
                <IconButton
                    onClick={toggleCollapse}
                    size="small"
                    sx={{
                        position: "absolute",
                        right: "-10px",
                        top: "20px",
                        backgroundColor: "background.paper",
                        boxShadow: 1,
                        zIndex: 1,
                        "&:hover": { backgroundColor: "action.hover" },
                    }}
                >
                    {collapsed ? <ChevronRight /> : <ChevronLeft />}
                </IconButton>
            )}

            <div
                className={`relative flex items-center ${
                    collapsed ? "justify-center px-2" : "pt-8 px-6"
                } mb-10`}
                onClick={() => {
                    toggleDrawer(false);
                    collapseAll();
                }}
            >
                {!collapsed && (
                    <Link
                        to="/"
                        className="absolute left-1 -top-2 mr-2 flex items-center"
                    >
                        <img
                            src="/icons/logoWhite.svg"
                            alt="logo"
                            style={{ height: 60, width: 120 }}
                        />
                    </Link>
                )}
            </div>

            {links.map((section, index) => (
                <Fragment key={section.sectionLabel}>
                    {index !== 0 && (
                        <Divider
                            sx={{
                                marginBottom: "16px",
                                marginLeft: collapsed ? "0" : "16px",
                                borderColor: "#6b7280",
                            }}
                        />
                    )}
                    <MenuSection
                        section={section}
                        collapsed={collapsed}
                        fontSize={fontSize}
                        activeKeys={activeKeys}
                        handleClick={handleClick}
                    />
                </Fragment>
            ))}

            {!collapsed && <Copyright />}
        </Box>
    );
};

export default DesktopMenu;
