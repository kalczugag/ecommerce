import { HelpOutline } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";

interface TooltipButtonProps {
    variant?: "text" | "contained" | "outlined";
    title: string;
    tooltipText: string;
    isDisabled: boolean;
    onClick: () => void;
}

const TooltipButton = ({
    variant,
    title,
    tooltipText,
    isDisabled,
    onClick,
}: TooltipButtonProps) => {
    return (
        <Button
            variant={variant}
            onClick={onClick}
            disabled={isDisabled}
            sx={{
                "&.Mui-disabled": {
                    pointerEvents: "auto",
                },
            }}
        >
            {title}
            {isDisabled && (
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
