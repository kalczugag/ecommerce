import { Fragment } from "react";
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
    const hasSubLinks = link.subLinks && link.subLinks.length > 0;

    return (
        <Fragment>
            <ListItem disablePadding={!collapsed}>
                <ListItemButton
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
                            <Box position="relative">
                                {link.icon}
                                {hasSubLinks && collapsed && (
                                    <ChevronRight
                                        fontSize={fontSize}
                                        sx={{ position: "absolute" }}
                                    />
                                )}
                            </Box>
                        ) : index % 2 === 0 ? (
                            <Inbox fontSize={fontSize} />
                        ) : (
                            <Mail fontSize={fontSize} />
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

            {hasSubLinks && !collapsed && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <SubMenuList
                        subLinks={link.subLinks!}
                        fontSize={fontSize}
                        handleClick={handleClick}
                    />
                </Collapse>
            )}
        </Fragment>
    );
};

export default MenuItem;
