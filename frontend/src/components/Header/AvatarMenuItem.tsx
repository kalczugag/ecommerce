import { Link, useNavigate } from "react-router-dom";
import { MenuItem, Button, Divider, ListItemIcon } from "@mui/material";

const AvatarAuth = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col space-y-2 p-4">
            <>
                <Button
                    variant="contained"
                    color="inherit"
                    fullWidth
                    onClick={() => navigate("/login")}
                >
                    Login
                </Button>
                <div className="flex justify-between items-center space-x-2">
                    <span>Don't have an account?</span>
                    <Link to="/register" className="font-bold hover:opacity-90">
                        Sign Up
                    </Link>
                </div>
            </>
        </div>
    );
};

export interface AvatarMenuItemProps {
    label?: string;
    to?: string;
    icon?: JSX.Element;
    visible?: boolean;
    divider?: boolean;
    customElement?: JSX.Element;
    onClick?: () => void;
}

const AvatarMenuItem = ({
    label = "",
    visible = true,
    divider: showDivider = false,
    icon: iconElement,
    customElement,
    onClick: handleClick,
}: AvatarMenuItemProps) => (
    <>
        {visible && (
            <>
                {!customElement ? (
                    <>
                        <MenuItem
                            key={label}
                            onClick={handleClick}
                            sx={{ mb: 0.5 }}
                        >
                            {iconElement && (
                                <ListItemIcon sx={{ mr: 1 }}>
                                    {iconElement}
                                </ListItemIcon>
                            )}
                            {label}
                        </MenuItem>
                        {showDivider && <Divider sx={{ width: "215px" }} />}
                    </>
                ) : (
                    <>
                        {customElement}
                        {showDivider && <Divider sx={{ width: "215px" }} />}
                    </>
                )}
            </>
        )}
    </>
);

export { AvatarAuth, AvatarMenuItem };
