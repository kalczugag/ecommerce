import { useState, useEffect, useRef } from "react";
import { changePostSearchTerm } from "../store";
import { GoSearch } from "react-icons/go";
import Button from "./Button";
import SearchBar from "./SearchBar";

const PostSearch = () => {
    const [showSearch, setShowSearch] = useState(false);
    const searchBarRef = useRef(null);

    const handleShowSearch = () => {
        setShowSearch(!showSearch);
    };

    const handleClickOutside = (event) => {
        if (
            searchBarRef.current &&
            !searchBarRef.current.contains(event.target)
        ) {
            setShowSearch(false);
        }
    };

    useEffect(() => {
        if (showSearch) {
            searchBarRef.current.focus();
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSearch]);

    return (
        <div>
            {showSearch || (
                <Button
                    className="border-0 text-white text-xl"
                    onClick={handleShowSearch}
                >
                    <GoSearch />
                </Button>
            )}
            {showSearch && (
                <div ref={searchBarRef}>
                    <SearchBar
                        className="w-full"
                        placeholder="Search for product"
                        type="text"
                        search={changePostSearchTerm}
                        what="posts"
                    />
                </div>
            )}
        </div>
    );
};

export default PostSearch;
