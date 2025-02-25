import PopperButton, { PopperButtonProps } from "@/components/PopperButton";
import { Button } from "@mui/material";

interface AdvancedSearchProps {
    handleBack: () => void;
    handleReset: (form: any) => void;
}

const config: PopperButtonProps["elements"] = [
    {
        label: "All Products",
    },
    {
        label: "Products with public visibility",
    },
];

const AdvancedSearch = ({ handleBack, handleReset }: AdvancedSearchProps) => {
    return (
        <div className="flex justify-end space-x-1">
            <Button variant="outlined" onClick={handleBack}>
                Cancel
            </Button>
            <PopperButton elements={config}>Search</PopperButton>
            <Button variant="outlined" onClick={handleReset}>
                Reset
            </Button>
        </div>
    );
};

export default AdvancedSearch;
