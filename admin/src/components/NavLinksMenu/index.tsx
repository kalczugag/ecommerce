import { Fragment, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toggleSidebar } from "@/store";
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
    useMediaQuery,
} from "@mui/material";
import { Inbox, Mail, ExpandLess, ExpandMore, Adb } from "@mui/icons-material";
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
}

const NavLinksMenu = ({ links }: NavLinksMenuProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isMobile = useMediaQuery("(max-width: 1024px)");
    const { isOpen: showDrawer } = useAppSelector((state) => state.sidebar);

    const [activeKeys, setActiveKeys] = useState<string[]>([]);

    const collapseAll = () => setActiveKeys([]);

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

    const DrawerList = (
        <Box
            width={250}
            role="presentaion"
            className="py-6 bg-dark-primary text-text-dark dark:bg-darker h-full"
        >
            <div
                className="flex items-center px-6 mb-10"
                onClick={() => {
                    toggleDrawer(false);
                    collapseAll();
                }}
            >
                <Adb className="mr-1" />
                <Link
                    to="/"
                    className="font-mono font-bold text-xl tracking-[.3rem] no-underline"
                >
                    LOGO
                </Link>
            </div>
            {links.map((section, index) => (
                <Fragment key={section.sectionLabel}>
                    {index !== 0 && (
                        <Divider
                            sx={{
                                marginBottom: "16px",
                                marginLeft: "16px",
                                borderColor: "#6b7280",
                            }}
                        />
                    )}
                    <List
                        subheader={
                            <h5 className="px-4 text-gray-400 text-sm font-semibold">
                                {section.sectionLabel}
                            </h5>
                        }
                    >
                        {section.elements.map((link, index) => {
                            const hasSubLinks =
                                link.subLinks && link.subLinks.length > 0;
                            const isOpen = activeKeys.includes(link.key);

                            return (
                                <Fragment key={link.key}>
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            onClick={() => handleClick(link)}
                                        >
                                            <ListItemIcon
                                                sx={{ color: "#e5e5e5" }}
                                            >
                                                {link.icon ? (
                                                    link.icon
                                                ) : index % 2 === 0 ? (
                                                    <Inbox />
                                                ) : (
                                                    <Mail />
                                                )}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={link.label}
                                            />
                                            {hasSubLinks &&
                                                (isOpen ? (
                                                    <ExpandLess />
                                                ) : (
                                                    <ExpandMore />
                                                ))}
                                        </ListItemButton>
                                    </ListItem>
                                    {hasSubLinks && (
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
            <Copyright />
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
