import { useState } from "react";
import { IconButton } from "@mui/material";
import { Close, Search as SearchIcon } from "@mui/icons-material";
import SearchItem from "../SearchItem";

const Search = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSearch = (searchTerm: string) => {
        console.log(searchTerm);
    };

    return (
        <div className="hidden md:block">
            {!isOpen ? (
                <IconButton onClick={() => setIsOpen(true)}>
                    <SearchIcon />
                </IconButton>
            ) : (
                <SearchItem
                    handleSubmit={handleSearch}
                    endAdornment={
                        <IconButton onClick={() => setIsOpen(false)}>
                            <Close />
                        </IconButton>
                    }
                    placeholder="Search product"
                />
            )}
        </div>
    );
};

export default Search;
