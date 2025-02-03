import { ReactNode, useRef, useState } from "react";
import {
    Button,
    ButtonGroup,
    ClickAwayListener,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

export interface PopperButtonProps {
    children: ReactNode;
    elements: {
        label: ReactNode;
        onClick?: () => void;
    }[];
}

const PopperButton = ({ children, elements }: PopperButtonProps) => {
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const anchorRef = useRef<HTMLElement | null>(null);

    const handleMenuItemClick = (event: any, index: number) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: any) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <ButtonGroup
                component="div"
                variant="contained"
                ref={anchorRef as React.RefObject<HTMLDivElement>}
            >
                <Button type="submit">{children}</Button>
                <Button
                    size="small"
                    aria-controls={open ? "button-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-label="select item"
                    aria-haspopup="menu"
                    variant="contained"
                    onClick={handleToggle}
                >
                    <ArrowDropDown />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{ zIndex: 1 }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom"
                                    ? "center top"
                                    : "center bottom",
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem>
                                    {elements.map((element, index) => (
                                        <MenuItem
                                            key={element.label + "_" + index}
                                            selected={index === selectedIndex}
                                            onClick={(event) => {
                                                handleMenuItemClick(
                                                    event,
                                                    index
                                                );
                                            }}
                                        >
                                            {element.label}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

export default PopperButton;
