import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import type { NavLink } from "./types";

interface SubMenuListProps {
    subLinks: NavLink[];
    fontSize: "small" | "medium" | "large";
    handleClick: (link: NavLink, isSubLink?: boolean) => void;
}

const fontSizeMap = {
    small: { primary: { fontSize: "0.875rem" } },
    medium: { primary: { fontSize: "1rem" } },
    large: { primary: { fontSize: "1.125rem" } },
};

const SubMenuList = ({ subLinks, fontSize, handleClick }: SubMenuListProps) => (
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
                backgroundColor: "#9ca3af",
            },
        }}
    >
        {subLinks.map((subLink) => (
            <ListItem
                key={subLink.key}
                disablePadding
                sx={{
                    pl: 3,
                    position: "relative",
                    "&:before": {
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        left: "-16px",
                        width: 40,
                        height: 2,
                        backgroundColor: "#9ca3af",
                    },
                }}
            >
                <ListItemButton onClick={() => handleClick(subLink, true)}>
                    <ListItemText
                        primary={subLink.label}
                        primaryTypographyProps={{
                            sx: fontSizeMap[fontSize].primary,
                        }}
                    />
                </ListItemButton>
            </ListItem>
        ))}
    </List>
);

export default SubMenuList;
