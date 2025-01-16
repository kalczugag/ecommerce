import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Drawer, IconButton, useMediaQuery } from "@mui/material";
import { Menu } from "@mui/icons-material";

export interface NavLink {
    key: string;
    label: string;
    to?: string;
    subLinks?: NavLink[];
    onClick?: () => void;
}

interface NavLinksMenuProps {
    links: NavLink[];
}

const NavLinksMenu = ({ links }: NavLinksMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const isMobile = useMediaQuery("(max-width: 1024px)");
    const location = useLocation();
    const navigate = useNavigate();

    const findActiveLink = (
        links: NavLink[],
        path: string
    ): NavLink | undefined => {
        for (const link of links) {
            if (link.to === path) return link;
            if (link.subLinks) {
                const activeSubLink = findActiveLink(link.subLinks, path);
                if (activeSubLink) return activeSubLink;
            }
        }
        return undefined;
    };

    const [activeKey, setActiveKey] = useState<string | null>(() => {
        const currentPath = location.pathname;
        const defaultActiveLink =
            findActiveLink(links, currentPath) || links[0];
        return defaultActiveLink ? defaultActiveLink.key : null;
    });

    const isActive = (link: NavLink) => link.key === activeKey;

    const handleClick = (link: NavLink) => {
        setActiveKey(link.key);
        if (link.to) {
            navigate(link.to);
        } else if (link.onClick) {
            link.onClick();
        }
    };

    const content = (
        <ul className="space-y-4">
            {links.map((link) => (
                <li
                    key={link.key}
                    className="space-y-2"
                    onClick={
                        !link.subLinks ? () => handleClick(link) : undefined
                    }
                >
                    <span className="text-xl font-bold">{link.label}</span>
                    {link.subLinks && (
                        <ul className="pl-4 space-y-2">
                            {link.subLinks.map((subLink) => (
                                <li
                                    key={subLink.key}
                                    className={`cursor-pointer ${
                                        isActive(subLink)
                                            ? "font-bold text-[#5146E7]"
                                            : ""
                                    } hover:underline`}
                                    onClick={() => handleClick(subLink)}
                                >
                                    {subLink.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );

    return (
        <>
            {isMobile ? (
                <>
                    <IconButton onClick={() => setIsOpen(true)}>
                        <Menu />
                    </IconButton>
                    <Drawer
                        anchor="left"
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                    >
                        <div className="p-4">{content}</div>
                    </Drawer>
                </>
            ) : (
                content
            )}
        </>
    );
};

export default NavLinksMenu;
