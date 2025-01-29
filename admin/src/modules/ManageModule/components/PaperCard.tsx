import { Button } from "@mui/material";
import { ReactNode } from "react";

export interface PaperCardProps {
    label?: string;
    elements: {
        label: ReactNode;
        icon?: JSX.Element;
        onClick?: () => void;
    }[];
}

const PaperCard = ({ label, elements }: PaperCardProps) => {
    return (
        <div className="bg-gray-200 p-4 space-y-4">
            <h4>{label}</h4>
            <div className="flex flex-col space-y-2">
                {elements.map((element) => (
                    <div>
                        <Button
                            variant="contained"
                            startIcon={element.icon}
                            onClick={element.onClick}
                        >
                            {element.label}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PaperCard;
