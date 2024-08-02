import { useState } from "react";
import {
    Modal,
    Box,
    Button,
    IconButton,
    Typography,
    Switch,
    FormControlLabel,
} from "@mui/material";
import { Settings } from "@mui/icons-material";
import useTheme from "@/hooks/useTheme";

const SettingsModal = () => {
    const { mode, toggleTheme } = useTheme();

    const [openModal, setOpenModal] = useState<boolean>(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    return (
        <div className="flex-1 flex items-end px-4">
            <IconButton onClick={handleOpen}>
                <Settings className="text-text-light dark:text-text-dark" />
            </IconButton>
            <Modal open={openModal} onClose={handleClose}>
                <Box
                    className="bg-light-secondary dark:bg-dark-primary"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <FormControlLabel
                        sx={{ mt: 2 }}
                        control={
                            <Switch
                                checked={mode === "dark" ? true : false}
                                onChange={toggleTheme}
                            />
                        }
                        label="Dark Mode"
                    />
                    <Button data-testid="closeButton" onClick={handleClose} />
                </Box>
            </Modal>
        </div>
    );
};

export default SettingsModal;
