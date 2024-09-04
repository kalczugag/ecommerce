import { ExpandMore } from "@mui/icons-material";

const SortBar = () => {
    return (
        <div className="flex flex-row justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Product</h1>
            <div>
                <button className="flex items-center">
                    <span>Sort</span> <ExpandMore />
                </button>
            </div>
        </div>
    );
};

export default SortBar;
