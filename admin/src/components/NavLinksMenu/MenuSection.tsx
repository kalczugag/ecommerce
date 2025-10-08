import { List } from "@mui/material";
import MenuItem from "./MenuItem";
import type { NavLinkSection } from "./types";

interface MenuSectionProps {
    section: NavLinkSection;
    collapsed: boolean;
    fontSize: "small" | "medium" | "large";
    activeKeys: string[];
    handleClick: (link: any, isSubLink?: boolean) => void;
}

const fontSizeMap = {
    small: { primary: { fontSize: "0.875rem" }, section: "text-xs" },
    medium: { primary: { fontSize: "1rem" }, section: "text-sm" },
    large: { primary: { fontSize: "1.125rem" }, section: "text-base" },
};

const MenuSection = ({
    section,
    collapsed,
    fontSize,
    activeKeys,
    handleClick,
}: MenuSectionProps) => {
    return (
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
            {section.elements.map((link, i) => (
                <MenuItem
                    key={link.key}
                    link={link}
                    collapsed={collapsed}
                    fontSize={fontSize}
                    isOpen={activeKeys.includes(link.key)}
                    handleClick={handleClick}
                    index={i}
                />
            ))}
        </List>
    );
};

export default MenuSection;
