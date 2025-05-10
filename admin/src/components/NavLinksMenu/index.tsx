import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toggleSidebar, toggleCollapsed } from "@/store";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import {
    Box,
    Collapse,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Tooltip,
    useMediaQuery,
} from "@mui/material";
import {
    Inbox,
    Mail,
    ExpandLess,
    ExpandMore,
    Adb,
    ChevronLeft,
    ChevronRight,
} from "@mui/icons-material";
import Copyright from "../Copyright";

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

const NavLinksMenu = ({ links, fontSize = "medium" }: NavLinksMenuProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isMobile = useMediaQuery("(max-width: 1024px)");
    const { isOpen: showDrawer, collapsed } = useAppSelector(
        (state) => state.sidebar
    );

    const prevIsMobile = useRef(isMobile);
    const prevDesktopCollapsedState = useRef(collapsed);

    const [activeKeys, setActiveKeys] = useState<string[]>([]);

    const fontSizeMap = {
        small: {
            primary: {
                fontSize: "0.875rem",
            },
            section: "text-xs",
        },
        medium: {
            primary: {
                fontSize: "1rem",
            },
            section: "text-sm",
        },
        large: {
            primary: {
                fontSize: "1.125rem",
            },
            section: "text-base",
        },
    };

    const collapseAll = () => setActiveKeys([]);

    const toggleCollapse = () => {
        dispatch(toggleCollapsed(!collapsed));
    };

    const handleClick = (link: NavLink, isSubLink: boolean = false) => {
        if (link.to) {
            dispatch(toggleSidebar(false));
            if (link.to !== pathname) navigate(link.to);

            if (!isSubLink && (!link.subLinks || link.subLinks.length === 0)) {
                collapseAll();
            }
        } else if (link.onClick) {
            link.onClick();
        } else {
            setActiveKeys((prev) =>
                prev.includes(link.key) ? [] : [link.key]
            );
        }
    };

    const toggleDrawer = (newOpen: boolean) => {
        dispatch(toggleSidebar(newOpen));
    };

    useEffect(() => {
        if (isMobile && !prevIsMobile.current) {
            prevDesktopCollapsedState.current = collapsed;
            dispatch(toggleCollapsed(false));
        } else if (!isMobile && prevIsMobile.current) {
            dispatch(toggleCollapsed(prevDesktopCollapsedState.current));
        }

        prevIsMobile.current = isMobile;
    }, [isMobile, collapsed]);

    const DrawerList = (
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
                        "&:hover": {
                            backgroundColor: "action.hover",
                        },
                    }}
                >
                    {collapsed ? <ChevronRight /> : <ChevronLeft />}
                </IconButton>
            )}

            <div
                className={`flex items-center ${
                    collapsed ? "justify-center px-2" : "px-6"
                } mb-10`}
                onClick={() => {
                    toggleDrawer(false);
                    collapseAll();
                }}
            >
                <Adb className={collapsed ? "mx-auto" : "mr-1"} />
                {!collapsed && (
                    <Link
                        to="/"
                        className="font-mono font-bold text-xl tracking-[.3rem] no-underline"
                    >
                        LOGO
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
                                marginRight: collapsed ? "0" : undefined,
                                borderColor: "#6b7280",
                            }}
                        />
                    )}
                    <List
                        subheader={
                            !collapsed && (
                                <h5
                                    className={`px-4 text-gray-400 text-sm font-semibold ${fontSizeMap[fontSize].section}`}
                                >
                                    {section.sectionLabel}
                                </h5>
                            )
                        }
                    >
                        {section.elements.map((link, index) => {
                            const hasSubLinks =
                                link.subLinks && link.subLinks.length > 0;
                            const isOpen = activeKeys.includes(link.key);

                            return (
                                <Fragment key={link.key}>
                                    <ListItem
                                        disablePadding={
                                            collapsed ? false : true
                                        }
                                    >
                                        <Tooltip
                                            title={collapsed ? link.label : ""}
                                            placement="right"
                                            disableHoverListener={!collapsed}
                                        >
                                            <ListItemButton
                                                onClick={() =>
                                                    handleClick(link)
                                                }
                                                sx={{
                                                    minHeight: 48,
                                                    justifyContent: collapsed
                                                        ? "center"
                                                        : "initial",
                                                    px: collapsed ? 1 : 2,
                                                }}
                                            >
                                                <ListItemIcon
                                                    sx={{
                                                        color: "#e5e5e5",
                                                        minWidth: collapsed
                                                            ? 0
                                                            : 40,
                                                        mr: collapsed
                                                            ? "auto"
                                                            : 2,
                                                        justifyContent:
                                                            "center",
                                                    }}
                                                >
                                                    {link.icon ? (
                                                        link.icon
                                                    ) : index % 2 === 0 ? (
                                                        <Inbox
                                                            fontSize={fontSize}
                                                        />
                                                    ) : (
                                                        <Mail
                                                            fontSize={fontSize}
                                                        />
                                                    )}
                                                </ListItemIcon>
                                                {!collapsed && (
                                                    <ListItemText
                                                        primary={link.label}
                                                        primaryTypographyProps={{
                                                            sx: fontSizeMap[
                                                                fontSize
                                                            ].primary,
                                                        }}
                                                    />
                                                )}
                                                {!collapsed &&
                                                    hasSubLinks &&
                                                    (isOpen ? (
                                                        <ExpandLess />
                                                    ) : (
                                                        <ExpandMore />
                                                    ))}
                                            </ListItemButton>
                                        </Tooltip>
                                    </ListItem>
                                    {hasSubLinks && !collapsed && (
                                        <Collapse
                                            in={isOpen}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            <List
                                                component="div"
                                                disablePadding
                                                sx={{
                                                    position: "relative",
                                                    pl: 5.5,
                                                    "&:before": {
                                                        content: '""',
                                                        position: "absolute",
                                                        top: 0,
                                                        bottom: 22,
                                                        left: 27,
                                                        width: 2,
                                                        backgroundColor:
                                                            "#9ca3af",
                                                    },
                                                }}
                                            >
                                                {link.subLinks?.map(
                                                    (subLink) => (
                                                        <ListItem
                                                            key={subLink.key}
                                                            disablePadding
                                                            sx={{
                                                                pl: 3,
                                                                position:
                                                                    "relative",
                                                                "&:before": {
                                                                    content:
                                                                        '""',
                                                                    position:
                                                                        "absolute",
                                                                    top: "50%",
                                                                    left: "-16px",
                                                                    width: 40,
                                                                    height: 2,
                                                                    backgroundColor:
                                                                        "#9ca3af",
                                                                },
                                                            }}
                                                        >
                                                            <ListItemButton
                                                                onClick={() =>
                                                                    handleClick(
                                                                        subLink,
                                                                        true
                                                                    )
                                                                }
                                                            >
                                                                <ListItemText
                                                                    primary={
                                                                        subLink.label
                                                                    }
                                                                    primaryTypographyProps={{
                                                                        sx: fontSizeMap[
                                                                            fontSize
                                                                        ]
                                                                            .primary,
                                                                    }}
                                                                />
                                                            </ListItemButton>
                                                        </ListItem>
                                                    )
                                                )}
                                            </List>
                                        </Collapse>
                                    )}
                                </Fragment>
                            );
                        })}
                    </List>
                </Fragment>
            ))}
            {!collapsed && <Copyright />}
        </Box>
    );

    return (
        <>
            {isMobile ? (
                <Drawer
                    anchor="left"
                    open={showDrawer}
                    onClose={() => toggleDrawer(false)}
                >
                    {DrawerList}
                </Drawer>
            ) : (
                <>{DrawerList}</>
            )}
        </>
    );
};

export default NavLinksMenu;
