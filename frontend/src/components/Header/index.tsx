import { ReactElement, useState } from "react";
import { useGetGroupedCategoriesQuery } from "@/store";
import {
    AppBar,
    Box,
    Fab,
    Fade,
    Toolbar,
    useScrollTrigger,
} from "@mui/material";
import TopHeader from "./TopHeader";
import FeaturedBar from "./FeaturedBar";
import BottomNav from "./BottomNav";
import { KeyboardArrowUp } from "@mui/icons-material";

interface ScrollTopProps {
    window?: () => Window;
    children?: ReactElement<unknown>;
}

const ScrollTop = ({ window, children }: ScrollTopProps) => {
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const anchor = (
            (event.target as HTMLDivElement).ownerDocument || document
        ).querySelector("#back-to-top-anchor");

        if (anchor) {
            anchor.scrollIntoView({
                block: "center",
                behavior: "smooth",
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 50 }}
            >
                {children}
            </Box>
        </Fade>
    );
};

interface HeaderProps {
    topLabel?: string;
}

const Header = ({ topLabel, ...props }: HeaderProps) => {
    const { data } = useGetGroupedCategoriesQuery({ sorted: true });

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "white",
                    boxShadow: "none",
                    borderBottom: "1px solid #e0e0e0",
                    color: "black",
                    "@media print": {
                        display: "none",
                    },
                }}
            >
                <FeaturedBar label={topLabel} />
                <TopHeader />
                <BottomNav data={data?.result} />
            </AppBar>
            <Toolbar id="back-to-top-anchor" />
            <ScrollTop {...props}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUp />
                </Fab>
            </ScrollTop>
        </>
    );
};

export default Header;
