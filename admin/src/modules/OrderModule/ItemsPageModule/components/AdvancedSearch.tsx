import PopperButton, { PopperButtonProps } from "@/components/PopperButton";
import { Button } from "@mui/material";

interface AdvancedSearchProps {
    form: any;
    handleBack: () => void;
}

const config: PopperButtonProps["elements"] = [
    {
        label: "All Products",
    },
    {
        label: "Products with public visibility",
    },
];

const AdvancedSearch = ({ form, handleBack }: AdvancedSearchProps) => {
    return (
        <div className="flex justify-end space-x-1">
            <Button variant="outlined" onClick={handleBack}>
                Cancel
            </Button>
            <PopperButton elements={config}>Search</PopperButton>
            <Button variant="outlined" onClick={form.reset}>
                Reset
            </Button>
        </div>
    );
};

export default AdvancedSearch;
