import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/store";
import useAuth from "@/hooks/useAuth";
import { Box, Tooltip, IconButton, Menu } from "@mui/material";
import {
    Search,
    LocalMallOutlined,
    PersonOutlineOutlined,
} from "@mui/icons-material";
import { AvatarMenuItem, AvatarAuth } from "./AvatarSettings";

const settings = ["Account", "Orders", "Return"];

const AccountTools = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const [logout] = useLogoutMutation();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        handleCloseUserMenu();
        await logout();
        alert("Logged out");
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
            <IconButton onClick={() => navigate("/cart")}>
                <LocalMallOutlined sx={{ position: "relative" }} />
                {!true && (
                    <div className="absolute -right-2 top-0 flex justify-center items-center  rounded-full w-5 h-5 text-xs text-white bg-red-500">
                        1
                    </div>
                )}
            </IconButton>
        </Box>
    );
};

export default AccountTools;
