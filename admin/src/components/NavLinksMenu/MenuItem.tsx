import { Fragment, useRef, useState } from "react";
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Box,
} from "@mui/material";
import {
    ExpandLess,
    ExpandMore,
    ChevronRight,
    Inbox,
    Mail,
} from "@mui/icons-material";
import SubMenuList from "./SubMenuList";
import type { NavLink } from "./types";
import MouseLeaveListener from "../MouseLeaveListener";
import SubMenuPopper from "./SubMenuPopper";

interface MenuItemProps {
    link: NavLink;
    collapsed: boolean;
    fontSize: "small" | "medium" | "large";
    isOpen: boolean;
    handleClick: (link: NavLink, isSubLink?: boolean) => void;
    index: number;
}

const fontSizeMap = {
    small: { primary: { fontSize: "0.875rem" } },
    medium: { primary: { fontSize: "1rem" } },
    large: { primary: { fontSize: "1.125rem" } },
};

const MenuItem = ({
    link,
    collapsed,
    fontSize,
    isOpen,
    handleClick,
    index,
}: MenuItemProps) => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const hasSubLinks = link.subLinks && link.subLinks.length > 0;
    const [open, setOpen] = useState(false);

    const handleShowPopper = () => setOpen(true);
    const handleClosePopper = () => setOpen(false);

    const itemContent = (
        <ListItem disablePadding={!collapsed}>
            <ListItemButton
                ref={anchorRef}
                onMouseEnter={
                    collapsed && hasSubLinks ? handleShowPopper : undefined
                }
                onClick={() => handleClick(link)}
                sx={{
                    minHeight: 48,
                    justifyContent: collapsed ? "center" : "initial",
                    px: collapsed ? 1 : 2,
                }}
            >
                <ListItemIcon
                    sx={{
                        color: "#e5e5e5",
                        minWidth: collapsed ? 0 : 40,
                        mr: collapsed ? "auto" : 2,
                        justifyContent: "center",
                    }}
                >
                    {link.icon ? (
                        <Box position="relative">{link.icon}</Box>
                    ) : index % 2 === 0 ? (
                        <Inbox fontSize={fontSize} />
                    ) : (
                        <Mail fontSize={fontSize} />
                    )}
                    {hasSubLinks && collapsed && (
                        <Box position="relative">
                            <ChevronRight
                                fontSize={fontSize}
                                sx={{ position: "absolute" }}
                            />
                        </Box>
                    )}
                </ListItemIcon>
                {!collapsed && (
                    <ListItemText
                        primary={link.label}
                        primaryTypographyProps={{
                            sx: fontSizeMap[fontSize].primary,
                        }}
                    />
                )}
                {!collapsed &&
                    hasSubLinks &&
                    (isOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
        </ListItem>
    );

    return (
        <Fragment>
            {collapsed && hasSubLinks ? (
                <MouseLeaveListener onMouseLeave={handleClosePopper}>
                    <Box position="relative">
                        {itemContent}
                        {hasSubLinks && collapsed && (
                            <SubMenuPopper
                                open={open}
                                anchorEl={anchorRef.current}
                                subLinks={link.subLinks!}
                                handleClick={(sublink: NavLink) => {
                                    handleClick(sublink);
                                    handleClosePopper();
                                }}
                            />
                        )}
                    </Box>
                </MouseLeaveListener>
            ) : (
                <>
                    {itemContent}
                    {hasSubLinks && !collapsed && (
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                            <SubMenuList
                                subLinks={link.subLinks!}
                                fontSize={fontSize}
                                handleClick={handleClick}
                            />
                        </Collapse>
                    )}
                </>
            )}
        </Fragment>
    );
};

export default MenuItem;
