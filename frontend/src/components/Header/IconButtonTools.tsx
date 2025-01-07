import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsersCartQuery, useLogoutMutation } from "@/store";
import { enqueueSnackbar } from "notistack";
import useAuth from "@/hooks/useAuth";
import { Box, MenuItem, Avatar } from "@mui/material";
import {
    Logout,
    Inbox,
    Settings,
    AssignmentReturned,
} from "@mui/icons-material";
import { AvatarAuth, AvatarMenuItemProps } from "./AvatarMenuItem";
import CartIcon from "./CartIcon";
import Search from "./Search";
import AvatarMenu from "./AvatarMenu";

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
                <MenuItem onClick={() => handleNavigate("/account")}>
                    <Avatar /> Profile
                </MenuItem>
            ),
            divider: true,
        },
        {
            label: "Orders",
            icon: <Inbox />,
            visible: Boolean(token),
            onClick: () => handleNavigate("/account/orders"),
        },
        {
            label: "Settings",
            icon: <Settings />,
            onClick: () => handleNavigate("/account/details"),
        },
        {
            label: "Returns",
            icon: <AssignmentReturned />,
            onClick: () => handleNavigate("/account/returns"),
        },
        {
            label: "Logout",
            icon: <Logout />,
            visible: Boolean(token),
            onClick: handleLogout,
        },
    ];

    return (
        <Box sx={{ flexGrow: 0 }} className="flex space-x-2">
            <AvatarMenu
                config={config}
                anchorElUser={anchorElUser}
                handleOpenUserMenu={handleOpenUserMenu}
                handleCloseUserMenu={handleCloseUserMenu}
            />
            <Search />
            <CartIcon data={data} />
        </Box>
    );
};

export default AccountTools;
