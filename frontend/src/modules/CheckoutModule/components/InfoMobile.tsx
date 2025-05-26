import { useState } from "react";
import { Close, ExpandMoreRounded } from "@mui/icons-material";
import { Box, Button, Drawer, IconButton } from "@mui/material";
import Info from "./Info";
import type { Item } from "@/types/Order";

interface InfoMobileProps {
    totalPrice: string;
    products: Item[];
}

const InfoMobile = ({ totalPrice, products }: InfoMobileProps) => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: "auto", px: 3, pb: 3, pt: 8 }} role="presentation">
            <IconButton
                onClick={() => toggleDrawer(false)}
                sx={{ position: "absolute", right: 8, top: 8 }}
            >
                <Close />
            </IconButton>
            <Info totalPrice={totalPrice} products={products} />
        </Box>
    );

    return (
        <div>
            <Button
                variant="text"
                endIcon={<ExpandMoreRounded />}
                onClick={() => toggleDrawer(true)}
            >
                View details
            </Button>
            <Drawer
                open={open}
                anchor="top"
                onClose={() => toggleDrawer(false)}
                slotProps={{
                    paper: {
                        sx: {
                            top: "var(--template-frame-height, 0px)",
                            backgroundImage: "none",
                            backgroundColor: "background.paper",
                        },
                    },
                }}
            >
                {DrawerList}
            </Drawer>
        </div>
    );
};

export default InfoMobile;
