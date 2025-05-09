import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useStore";
import { toggleSidebar, useLogoutMutation } from "@/store";
import {
    AppBar,
    Toolbar,
    IconButton,
    Tooltip,
    Box,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
    useMediaQuery,
} from "@mui/material";
import { Logout, Settings, Menu as MenuIcon } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";

const Header = () => {
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isMobile = useMediaQuery("(max-width: 1024px)");

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            handleClose();
            await logout().unwrap();
            navigate("/login");
            enqueueSnackbar("Logged out successfully", {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar("Failed to logout", {
                variant: "error",
            });
        }
    };

    return (
        <AppBar
            position="static"
            sx={{
                boxShadow: "none",
                background: "transparent",
            }}
        >
            <Toolbar
                sx={{ justifyContent: isMobile ? "space-between" : "end" }}
            >
                {isMobile && (
                    <IconButton onClick={() => dispatch(toggleSidebar(true))}>
                        <MenuIcon />
                    </IconButton>
                )}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? "account-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                        >
                            <Avatar>M</Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            "&::before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <MenuItem onClick={handleClose}>
                        <Avatar /> Profile
                    </MenuItem>
                    <Divider sx={{ width: "215px" }} />
                    <MenuItem
                        onClick={() => {
                            handleClose();
                            navigate("/settings/general");
                        }}
                    >
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
