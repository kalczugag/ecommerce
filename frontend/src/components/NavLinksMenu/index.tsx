import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useIsMobile from "@/hooks/useIsMobile";
import { Drawer, IconButton } from "@mui/material";
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

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isMobile = useIsMobile();

    const isActive = (link: NavLink) => {
        return pathname === link.to;
    };

    const handleClick = (to?: string, onClick?: () => void) => {
        if (to) {
            navigate(to);
        } else if (onClick) {
            onClick();
        }
    };

    const content = (
        <ul className="space-y-4">
            {links.map((link) => (
                <li
                    key={link.key}
                    className="space-y-2"
                    onClick={() => handleClick(link.to, link.onClick)}
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
                                    onClick={() =>
                                        handleClick(subLink.to, subLink.onClick)
                                    }
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
