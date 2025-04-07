import { useState } from "react";
import { Container, useMediaQuery } from "@mui/material";
import MouseLeaveListener from "@/components/MouseLeaveListener";
import CategoryButton from "./CategoryButton";
import CategoryList from "./CategoryList";
import type { GroupedCategories } from "@/types/Category";

interface BottomNavProps {
    data?: GroupedCategories;
}

const additionalCategories = [
    { name: "New Arrivals" },
    { name: "Special Offer", highlighted: true },
    { name: "Bestsellers" },
];

const BottomNav = ({ data }: BottomNavProps) => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [openCategories, setOpen] = useState({
        isOpen: false,
        page: "",
    });

    const handleMouseOver = (page: string) => {
        setOpen({ isOpen: true, page });
    };

    const handleCloseCategories = () => {
        setOpen((prev) => ({ ...prev, isOpen: false }));
    };

    const combinedData = additionalCategories.concat(
        data?.topLevelCategories || [{ name: "Women" }, { name: "Men" }]
    );

    return (
        <Container maxWidth="lg">
            <MouseLeaveListener
                onMouseLeave={handleCloseCategories}
                className="flex items-center space-x-2"
            >
                {combinedData.map(({ name, highlighted }, index) => (
                    <CategoryButton
                        key={name + "_" + index}
                        name={name}
                        onMouseOver={handleMouseOver}
                        onClick={handleCloseCategories}
                        highlighted={highlighted}
                    />
                ))}
                {!isMobile && (
                    <CategoryList
                        data={data}
                        page={openCategories.page}
                        isOpen={openCategories.isOpen}
                        setOpen={setOpen}
                    />
                )}
            </MouseLeaveListener>
        </Container>
    );
};

export default BottomNav;
