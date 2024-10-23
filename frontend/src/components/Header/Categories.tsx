import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Container } from "@mui/material";
import useIsMobile from "@/hooks/useIsMobile";
import type { GroupedCategories } from "@/types/Category";

interface CategoryButtonProps {
    name: string;
    onClick: () => void;
    onMouseOver: (name: string) => void;
}

const CategoryButton = ({
    name,
    onClick,
    onMouseOver,
}: CategoryButtonProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(name.toLowerCase());
        onClick();
    };

    return (
        <Button
            onClick={handleClick}
            onMouseOver={() => onMouseOver(name)}
            sx={{
                my: 2,
                color: "black",
                display: "block",
            }}
        >
            {name}
        </Button>
    );
};

interface CategoryListProps {
    data?: GroupedCategories;
    page: string;
    isOpen: boolean;
    setOpen: React.Dispatch<
        React.SetStateAction<{
            isOpen: boolean;
            page: string;
        }>
    >;
}

const CategoryList = ({ data, page, isOpen, setOpen }: CategoryListProps) => {
    if (!data) return null;

    const topLevelCategory = data.topLevelCategories.find(
        (category) => category.name.toLowerCase() === page.toLowerCase()
    );

    if (!topLevelCategory) return null;

    const handleMouseLeave = (e: React.MouseEvent) => {
        const target = e.relatedTarget as Element;
        if (!target?.closest(".categories-container")) {
            setOpen({ isOpen: false, page: "" });
        }
    };

    const handleMouseEnter = () => {
        isOpen && setOpen((prev) => ({ ...prev, isOpen: true }));
    };

    const handleCloseCategories = () => {
        setOpen((prev) => ({ ...prev, isOpen: false }));
    };

    return (
        <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {isOpen && (
                <Container
                    maxWidth={false}
                    disableGutters
                    sx={{
                        position: "absolute",
                        backgroundColor: "white",
                        padding: "20px",
                        borderBottom: "1px solid #e0e0e0",
                        zIndex: 9999,
                    }}
                >
                    <Container
                        maxWidth="xl"
                        sx={{
                            display: "flex",
                        }}
                    >
                        {data.secondLevelCategories
                            .filter(
                                (secondLevelCategory) =>
                                    secondLevelCategory.parentCategory._id ===
                                    topLevelCategory._id
                            )
                            .map((secondLevelCategory) => (
                                <ul
                                    key={secondLevelCategory._id}
                                    className="mr-12 space-y-2"
                                >
                                    <Link
                                        to={
                                            page.toLowerCase() +
                                            "/" +
                                            secondLevelCategory.name.toLowerCase()
                                        }
                                        className="font-bold"
                                        onClick={handleCloseCategories}
                                    >
                                        {secondLevelCategory.name}
                                    </Link>

                                    {data.thirdLevelCategories
                                        .filter(
                                            (thirdLevelCategory) =>
                                                thirdLevelCategory
                                                    .parentCategory._id ===
                                                secondLevelCategory._id
                                        )
                                        .map((thirdLevelCategory) => (
                                            <li key={thirdLevelCategory._id}>
                                                <Link
                                                    to={
                                                        page.toLowerCase() +
                                                        "/" +
                                                        secondLevelCategory.name.toLowerCase() +
                                                        "/" +
                                                        thirdLevelCategory.name
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s+/g,
                                                                "-"
                                                            )
                                                    }
                                                    onClick={
                                                        handleCloseCategories
                                                    }
                                                >
                                                    {thirdLevelCategory.name}
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            ))}
                    </Container>
                </Container>
            )}
        </Box>
    );
};

interface CategoryContainerProps {
    data: GroupedCategories;
    openCategories: {
        isOpen: boolean;
        page: string;
    };
    setOpen: React.Dispatch<
        React.SetStateAction<{
            isOpen: boolean;
            page: string;
        }>
    >;
}

const CategoryContainer = ({
    data,
    openCategories,
    setOpen,
}: CategoryContainerProps) => {
    const handleMouseOver = (page: string) => {
        setOpen({ isOpen: true, page });
    };

    const handleCloseCategories = () => {
        setOpen((prev) => ({ ...prev, isOpen: false }));
    };

    return (
        <Box className="flex flex-grow">
            {data
                ? data.topLevelCategories.map(({ name }, index) => (
                      <CategoryButton
                          key={name + "_" + index}
                          name={name}
                          onMouseOver={handleMouseOver}
                          onClick={handleCloseCategories}
                      />
                  ))
                : null}
        </Box>
    );
};

export { CategoryList, CategoryContainer };
