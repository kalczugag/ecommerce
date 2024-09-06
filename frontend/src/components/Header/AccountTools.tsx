import { useState } from "react";
import { Box, Tooltip, IconButton, Menu, Avatar } from "@mui/material";
import {
    Search,
    LocalMallOutlined,
    PersonOutlineOutlined,
} from "@mui/icons-material";
import AvatarSettings from "./AvatarSettings";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const AccountTools = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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
                {settings.map((setting) => (
                    <AvatarSettings
                        label={setting}
                        handleCloseMenu={handleCloseUserMenu}
                    />
                ))}
            </Menu>
            <IconButton>
                <Search />
            </IconButton>
            <IconButton>
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
