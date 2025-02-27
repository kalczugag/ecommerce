import { HelpOutline } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";

interface TooltipButtonProps {
    variant?: "text" | "contained" | "outlined";
    color?:
        | "inherit"
        | "primary"
        | "secondary"
        | "success"
        | "error"
        | "info"
        | "warning";
    title: string;
    tooltipText: string;
    disabled: boolean;
    onClick: () => void;
}

const TooltipButton = ({
    variant,
    color,
    title,
    tooltipText,
    disabled,
    onClick,
}: TooltipButtonProps) => {
    return (
        <Tooltip title={tooltipText}>
            <span>
                <Button
                    variant={variant}
                    onClick={onClick}
                    disabled={disabled}
                    color={color}
                >
                    {title}
                </Button>
            </span>
        </Tooltip>
    );
};

export default TooltipButton;
