import { ReactNode, useState } from "react";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";

interface MenuButtonProps {
    children: ReactNode;
    variant?: "text" | "icon";
    size?: "small" | "medium" | "large";
    elements: {
        label: ReactNode;
        onClick?: () => void;
    }[];
}

const MenuButton = ({
    children,
    variant = "text",
    size = "medium",
    elements,
}: MenuButtonProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <div>
            {variant === "text" ? (
                <Button onClick={handleClick} size={size}>
                    {children}
                </Button>
            ) : (
                <IconButton onClick={handleClick} size={size}>
                    {children}
                </IconButton>
            )}
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {elements.map((el, index) => (
                    <MenuItem
                        key={el.label + "_" + index}
                        onClick={() => {
                            handleClose();
                            el.onClick?.();
                        }}
                    >
                        {el.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default MenuButton;
