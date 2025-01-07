import { ExpandMore } from "@mui/icons-material";

const SortBar = () => {
    return (
        <div>
            <button className="flex items-center">
                <span>Sort</span> <ExpandMore />
            </button>
        </div>
    );
};

export default SortBar;
