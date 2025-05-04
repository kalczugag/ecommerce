import { useState } from "react";
import { PersonOutlineOutlined } from "@mui/icons-material";
import { Button, IconButton, Menu, Tooltip } from "@mui/material";
import { AvatarMenuItem, AvatarMenuItemProps } from "./AvatarMenuItem";
import { useNavigate } from "react-router-dom";
import LoginDialog from "@/components/AuthDialogs/LoginDialog";
import RegisterDialog from "@/components/AuthDialogs/RegisterDialog";

interface AvatarMenuProps {
    config: AvatarMenuItemProps[];
    isAuth: boolean;
    isMobile: boolean;
    anchorElUser: HTMLElement | null;
    handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
    handleCloseUserMenu: () => void;
}

const AvatarMenu = ({
    config,
    isAuth,
    isMobile,
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
}: AvatarMenuProps) => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);

    const handleTabChange = () => {
        if (loginOpen) {
            setLoginOpen(false);
            setRegisterOpen(true);
        } else {
            setRegisterOpen(false);
            setLoginOpen(true);
        }
    };

    return (
        <div>
            {isMobile ? (
                <Tooltip title="Open settings">
                    <IconButton
                        onClick={(e) =>
                            isAuth ? handleOpenUserMenu(e) : setLoginOpen(true)
                        }
                    >
                        <PersonOutlineOutlined sx={{ fontSize: "24px" }} />
                    </IconButton>
                </Tooltip>
            ) : (
                <Button
                    onClick={(e) =>
                        isAuth ? handleOpenUserMenu(e) : setLoginOpen(true)
                    }
                    startIcon={<PersonOutlineOutlined />}
                    color="inherit"
                >
                    {isAuth ? "My account" : "Sign In"}
                </Button>
            )}
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
                open={isAuth && Boolean(anchorElUser)}
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
            <LoginDialog
                open={loginOpen}
                onClose={() => setLoginOpen(false)}
                handleTabChange={handleTabChange}
            />
            <RegisterDialog
                open={registerOpen}
                onClose={() => setRegisterOpen(false)}
                handleTabChange={handleTabChange}
            />
        </div>
    );
};

export default AvatarMenu;
