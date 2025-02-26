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
        <Button
            variant={variant}
            onClick={onClick}
            disabled={disabled}
            color={color}
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
