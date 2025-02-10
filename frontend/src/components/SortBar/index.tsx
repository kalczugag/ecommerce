import { useState } from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { IconButton, ListSubheader, Menu, MenuItem } from "@mui/material";
import { Sort } from "@mui/icons-material";

type SortType = "asc" | "desc";

export interface SortBarProps {
    config: {
        listLabel?: string;
        elements: {
            label: string;
            value: string;
        }[];
    }[];
}

const SortBar = ({ config }: SortBarProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [_, setQueryParams] = useQueryParams();

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) =>
        setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleSort = (sort: string) => {
        setQueryParams({ sort });

        handleClose();
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <Sort />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {config.map((item) => (
                    <>
                        {item.listLabel && (
                            <ListSubheader>{item.listLabel}</ListSubheader>
                        )}
                        {item.elements.map((element) => (
                            <MenuItem onClick={() => handleSort(element.value)}>
                                {element.label}
                            </MenuItem>
                        ))}
                    </>
                ))}
            </Menu>
        </div>
    );
};

export default SortBar;
