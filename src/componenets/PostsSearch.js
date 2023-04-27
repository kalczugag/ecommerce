import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchTerm } from "../store";
import { GoSearch } from "react-icons/go";
import Button from "./Button";

const PostSearch = () => {
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => {
        return state.posts.searchTerm;
    });
    const [showSearch, setShowSearch] = useState(false);
    const searchRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        if (showSearch) {
            inputRef.current.focus();
        }
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, [showSearch]);

    const handleShowSearch = () => {
        setShowSearch(!showSearch);
    };

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setShowSearch(false);
        }
    };

    const handleChangeSearchTern = (event) => {
        dispatch(changeSearchTerm(event.target.value));
    };

    return (
        <div ref={searchRef} className="relative">
            <Button
                className="border-0 text-white text-xl"
                onClick={handleShowSearch}
            >
                <GoSearch />
            </Button>
            {showSearch && (
                <div className="absolute right-1/4 bg-gray-800 p-1 mt-2 rounded">
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={handleChangeSearchTern}
                    />
                </div>
            )}
        </div>
    );
};

export default PostSearch;
