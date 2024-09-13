import { Link, useNavigate } from "react-router-dom";
import { MenuItem, Typography, Button } from "@mui/material";

interface AvatarAuthProps {
    isAuth: boolean;
}

const AvatarAuth = ({ isAuth }: AvatarAuthProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col space-y-2 p-4">
            {!isAuth && (
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
                        <Link
                            to="/register"
                            className="font-bold hover:opacity-90"
                        >
                            Sign Up
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

interface AvatarSettingsProps {
    label: string;
    action: () => void;
}

const AvatarMenuItem = ({ label, action }: AvatarSettingsProps) => {
    return (
        <MenuItem key={label} onClick={action}>
            <Typography textAlign="center">{label}</Typography>
        </MenuItem>
    );
};

export { AvatarAuth, AvatarMenuItem };
