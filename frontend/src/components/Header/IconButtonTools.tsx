import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsersCartCountQuery, useLogoutMutation } from "@/store";
import useAuth from "@/hooks/useAuth";
import { Box, MenuItem, Avatar } from "@mui/material";
import {
    Logout,
    Inbox,
    Settings,
    AssignmentReturned,
} from "@mui/icons-material";
import { AvatarAuth, AvatarMenuItemProps } from "./AvatarMenuItem";
import { CartIcon } from "@/components/Cart";
import Search from "./Search";
import AvatarMenu from "./AvatarMenu";
import { useHandleMutation } from "@/hooks/useHandleMutation";
import { useAnalytics } from "@/hooks/useAnalytics";

const AccountTools = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const { handleMutation } = useHandleMutation();
    const { trackEvent, clearSession } = useAnalytics();
    const { data } = useGetUsersCartCountQuery(
        { onlyCount: true },
        {
            skip: !token,
        }
    );

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

    const handleLogout = () => {
        handleCloseUserMenu();

        handleMutation({
            mutation: logout,
            onSuccess: () => {
                trackEvent("log_out");
                trackEvent("session_end", { reason: "logout" });
                clearSession();
                navigate("/");
            },
        });
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
            <CartIcon count={data?.result.count || 0} />
        </Box>
    );
};

export default AccountTools;
