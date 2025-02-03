import { ExpandMore } from "@mui/icons-material";
import { Button } from "@mui/material";

const AdvancedSearch = () => {
    return (
        <div className="flex justify-center space-x-1">
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained" endIcon={<ExpandMore />}>
                Search
            </Button>
            <Button variant="outlined">Reset</Button>
        </div>
    );
};

export default AdvancedSearch;
