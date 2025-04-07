import { useState } from "react";
import { useGetGroupedCategoriesQuery } from "@/store";
import { AppBar } from "@mui/material";
import TopHeader from "./TopHeader";
import FeaturedBar from "./FeaturedBar";
import BottomNav from "./BottomNav";

interface HeaderProps {
    topLabel?: string;
}

const Header = ({ topLabel }: HeaderProps) => {
    const { data } = useGetGroupedCategoriesQuery({ sorted: true });

    return (
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
    );
};

export default Header;
