import { useState } from "react";
import { Popper } from "@mui/material";

interface SublinksPopperProps {
    anchorEl: HTMLElement | null;
}

const SublinksPopper = ({ anchorEl }: SublinksPopperProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Popper
            open={open}
            anchorEl={anchorEl}
            placement="right-start"
            transition
            disablePortal
        >
            x
        </Popper>
    );
};

export default SublinksPopper;
