import { useState } from "react";
import { GoSearch } from "react-icons/go";
import Button from "./Button";

const PostSearch = () => {
    const [showSearch, setShowSearch] = useState(false);

    const handleShowSearch = () => {
        setShowSearch(!showSearch);
    };

    return (
        <div className="relative">
            <Button
                className="border-0 text-white text-xl"
                onClick={handleShowSearch}
            >
                <GoSearch />
            </Button>
            {showSearch && (
                <div className="absolute right-1/4 bg-gray-800 p-2 mt-2 rounded">
                    <input type="text" />
                </div>
            )}
        </div>
    );
};

export default PostSearch;
