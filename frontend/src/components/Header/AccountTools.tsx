import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsersCartQuery, useLogoutMutation } from "@/store";
import { enqueueSnackbar } from "notistack";
import useAuth from "@/hooks/useAuth";
import {
    Box,
    Tooltip,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
} from "@mui/material";
import {
    Search,
    PersonOutlineOutlined,
    Logout,
    Inbox,
    Settings,
    AssignmentReturned,
} from "@mui/icons-material";
import {
    AvatarMenuItem,
    AvatarAuth,
    AvatarMenuItemProps,
} from "./AvatarSettings";
import CartIcon from "./CartIcon";

const AccountTools = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const { data } = useGetUsersCartQuery(undefined, {
        skip: !token,
    });
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const [logout] = useLogoutMutation();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavigate = (to: string) => {
        handleCloseUserMenu();
        navigate(to);
    };

    const handleLogout = async () => {
        try {
            handleCloseUserMenu();
            await logout();
            enqueueSnackbar("Logged out successfully", {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar("Failed to logout", {
                variant: "error",
            });
        }
    };

    const config: AvatarMenuItemProps[] = [
        {
            visible: Boolean(!token),
            customElement: <AvatarAuth />,
        },
        {
            visible: Boolean(token),
            customElement: (
                <MenuItem>
                    <Avatar /> Profile
                </MenuItem>
            ),
            divider: true,
            onClick: () => handleNavigate("/account"),
        },
        {
            label: "Orders",
            icon: <Inbox />,
            visible: Boolean(token),
            onClick: () => handleNavigate("/orders"),
        },
        {
            label: "Settings",
            icon: <Settings />,
            onClick: () => handleNavigate("/settings"),
        },
        {
            label: "Return",
            icon: <AssignmentReturned />,
            onClick: () => handleNavigate("/return"),
        },
        {
            label: "Logout",
            icon: <Logout />,
            visible: Boolean(token),
            onClick: handleLogout,
        },
    ];

    return (
        <Box sx={{ flexGrow: 0 }} className="space-x-2">
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <PersonOutlineOutlined sx={{ fontSize: "24px" }} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                keepMounted
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
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
            >
                {config.map((item, index) => (
                    <AvatarMenuItem key={index} {...item} />
                ))}
            </Menu>
            <IconButton>
                <Search />
            </IconButton>
            <CartIcon data={data} />
        </Box>
    );
};

export default AccountTools;
