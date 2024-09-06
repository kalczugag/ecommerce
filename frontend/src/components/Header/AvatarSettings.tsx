import { MenuItem, Typography } from "@mui/material";

interface AvatarSettingsProps {
    label: string;
    handleCloseMenu: () => void;
}

const AvatarSettings = ({ label, handleCloseMenu }: AvatarSettingsProps) => {
    return (
        <MenuItem key={label} onClick={handleCloseMenu}>
            <Typography textAlign="center">{label}</Typography>
        </MenuItem>
    );
};

export default AvatarSettings;
