import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAllProductsQuery } from "@/store";
import useDebounce from "@/hooks/useDebounce";
import { IconButton } from "@mui/material";
import { Close, Search as SearchIcon } from "@mui/icons-material";
import SearchItem from "../SearchItem";

const Search = () => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useSearchParams();

    const { isSuccess } = useGetAllProductsQuery(query, {
        skip: !query,
    });

    const handleSearch = useDebounce((value: { searchTerm: string }) => {
        if (value.searchTerm === undefined) return;
        // const filter = { $text: { $search: value.searchTerm } };

        setQuery({ q: value.searchTerm });
    }, 250);

    useEffect(() => {
        if (isSuccess) navigate(`products?q=${query.get("q")}`);
    }, [isSuccess]);

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
