import { useState } from "react";
import { useGetUsersCartQuery, useLogoutMutation } from "@/store";
import { enqueueSnackbar } from "notistack";
import useAuth from "@/hooks/useAuth";
import { Box, Tooltip, IconButton, Menu } from "@mui/material";
import { Search, PersonOutlineOutlined } from "@mui/icons-material";
import { AvatarMenuItem, AvatarAuth } from "./AvatarSettings";
import CartIcon from "./CartIcon";

const settings = ["Account", "Orders", "Return"];

const AccountTools = () => {
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
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <AvatarAuth isAuth={Boolean(token)} />
                {settings.map((setting, index) => (
                    <AvatarMenuItem
                        key={setting + "_" + index}
                        label={setting}
                        action={handleCloseUserMenu}
                    />
                ))}
                {token && (
                    <AvatarMenuItem
                        key="logout"
                        label="Logout"
                        action={handleLogout}
                    />
                )}
            </Menu>
            <IconButton>
                <Search />
            </IconButton>
            <CartIcon data={data} />
        </Box>
    );
};

export default AccountTools;
