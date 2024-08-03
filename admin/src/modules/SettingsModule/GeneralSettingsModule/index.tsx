import useTheme from "@/hooks/useTheme";
import {
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

const GeneralSettingsModule = () => {
    const { mode, handleChange } = useTheme();

    if (!mode || !handleChange) {
        return null;
    }

    return (
        <>
            <FormControl>
                <InputLabel>Theme</InputLabel>
                <Select value={mode} label="Theme" onChange={handleChange}>
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                </Select>
            </FormControl>
            <Divider />
        </>
    );
};

export default GeneralSettingsModule;
