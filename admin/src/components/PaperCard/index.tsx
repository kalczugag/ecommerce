import { Button } from "@mui/material";
import { ReactNode } from "react";

export interface PaperCardProps {
    description?: string;
    elements: {
        label: ReactNode;
        icon?: JSX.Element;
        isLoading?: boolean;
        onClick?: () => void;
    }[];
}

const PaperCard = ({ description, elements }: PaperCardProps) => {
    return (
        <div className="flex-1 bg-gray-200 p-4 space-y-4 dark:bg-text-light">
            <p>{description}</p>
            <div className="flex flex-col space-y-2">
                {elements.map((element, index) => (
                    <div key={element.label + "_" + index}>
                        <Button
                            variant="contained"
                            startIcon={element.icon}
                            onClick={element.onClick}
                            disabled={element.isLoading}
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
