import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAllProductsQuery } from "@/store";
import useDebounce from "@/hooks/useDebounce";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Backdrop, Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import SearchItem from "../SearchItem";

interface SearchProps {
    isMobile: boolean;
}

const Search = ({ isMobile }: SearchProps) => {
    const navigate = useNavigate();
    const { trackEvent } = useAnalytics();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useSearchParams();
    const containerRef = useRef<HTMLDivElement>(null);

    const { isSuccess } = useGetAllProductsQuery(query, {
        skip: !!query,
    });

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleSearch = useDebounce((value: { searchTerm: string }) => {
        if (value.searchTerm === undefined) return;
        // const filter = { $text: { $search: value.searchTerm } };

        trackEvent("search_performed", { searchTerm: value.searchTerm });

        setQuery({ q: value.searchTerm });
        handleClose();
    }, 250);

    useEffect(() => {
        if (isSuccess) navigate(`products?q=${query.get("q")}`);
    }, [isSuccess]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                handleClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <Box sx={{ position: "relative", flex: 1 }} ref={containerRef}>
            <Backdrop
                open={isOpen}
                sx={{ zIndex: (theme) => theme.zIndex.appBar - 1 }}
                onClick={handleClose}
            />
            <Box
                sx={{
                    zIndex: (theme) => theme.zIndex.appBar + 1,
                    position: "relative",
                }}
            >
                <SearchItem
                    handleSubmit={handleSearch}
                    handleOpen={handleOpen}
                />
            </Box>
        </Box>
    );
};

export default Search;
