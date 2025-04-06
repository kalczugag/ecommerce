import { Container, Toolbar } from "@mui/material";
import type { GroupedCategories } from "@/types/Category";
import CategoryButton from "./CategoryButton";
import { useState } from "react";

interface BottomNavProps {
    data?: GroupedCategories;
}

const BottomNav = ({ data }: BottomNavProps) => {
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

    return (
        <Container maxWidth="lg">
            <div className="flex items-center">
                {(
                    data?.topLevelCategories || [
                        { name: "men" },
                        { name: "women" },
                    ]
                ).map(({ name }, index) => (
                    <CategoryButton
                        key={name + "_" + index}
                        name={name}
                        onMouseOver={handleMouseOver}
                        onClick={handleCloseCategories}
                    />
                ))}
            </div>
        </Container>
    );
};

export default BottomNav;
