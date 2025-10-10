import {
    Popper,
    Paper,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Grow,
    Box,
} from "@mui/material";
import type { NavLink } from "./types";
import { Inbox, Mail } from "@mui/icons-material";

interface SubMenuPopperProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    subLinks: NavLink[];
    handleClick: (link: NavLink) => void;
}

const SubMenuPopper = ({
    open,
    anchorEl,
    subLinks,
    handleClick,
}: SubMenuPopperProps) => {
    return (
        <Popper
            open={open}
            anchorEl={anchorEl}
            placement="right-start"
            transition
            disablePortal={false}
            sx={{
                zIndex: 999,
            }}
            modifiers={[
                {
                    name: "offset",
                    options: {
                        offset: [6, 0],
                    },
                },
            ]}
        >
            {({ TransitionProps }) => (
                <Grow {...TransitionProps} timeout={150}>
                    <Paper
                        elevation={6}
                        sx={{
                            borderRadius: 2,
                            minWidth: 180,
                            overflow: "hidden",
                        }}
                    >
                        <List dense disablePadding>
                            {subLinks.map((sublink, i) => (
                                <ListItemButton
                                    key={sublink.label}
                                    sx={{
                                        py: 1,
                                        px: 2,
                                    }}
                                    onClick={() => handleClick(sublink)}
                                >
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        {sublink.icon ? (
                                            <Box position="relative">
                                                {sublink.icon}
                                            </Box>
                                        ) : i % 2 === 0 ? (
                                            <Inbox fontSize="small" />
                                        ) : (
                                            <Mail fontSize="small" />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={sublink.label}
                                        primaryTypographyProps={{
                                            fontSize: "0.875rem",
                                        }}
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
};

export default SubMenuPopper;
