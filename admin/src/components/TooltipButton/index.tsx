import { HelpOutline } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";

interface TooltipButtonProps {
    variant?: "text" | "contained" | "outlined";
    title: string;
    tooltipText: string;
    disabled: boolean;
    onClick: () => void;
}

const TooltipButton = ({
    variant,
    title,
    tooltipText,
    disabled,
    onClick,
}: TooltipButtonProps) => {
    return (
        <Button
            variant={variant}
            onClick={onClick}
            disabled={disabled}
            sx={{
                "&.Mui-disabled": {
                    pointerEvents: "auto",
                },
            }}
        >
            {title}
            {disabled && (
                <Tooltip title={tooltipText}>
                    <span style={{ display: "inline-block", marginLeft: 8 }}>
                        <HelpOutline fontSize="small" />
                    </span>
                </Tooltip>
            )}
        </Button>
    );
};

export default TooltipButton;
