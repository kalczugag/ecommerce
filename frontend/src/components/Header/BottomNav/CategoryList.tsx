import type { GroupedCategories } from "@/types/Category";
import { Box, Container, Divider } from "@mui/material";
import { Link } from "react-router-dom";

interface CategoryListProps {
    data?: GroupedCategories;
    page: string;
    isOpen: boolean;
    setOpen: React.Dispatch<
        React.SetStateAction<{ isOpen: boolean; page: string }>
    >;
}

const CategoryList = ({ data, page, isOpen, setOpen }: CategoryListProps) => {
    if (!data) return null;

    const topLevelCategory = data.topLevelCategories.find(
        (category) =>
            category.name.toLowerCase() === page.toLowerCase() &&
            !category.hidden
    );

    if (!topLevelCategory) return null;

    const handleCloseCategories = () => {
        setOpen((prev) => ({ ...prev, isOpen: false }));
    };

    return (
        <Box>
            {isOpen && (
                <Container
                    maxWidth={false}
                    disableGutters
                    sx={{
                        position: "absolute",
                        top: 129.5,
                        left: 0,
                        backgroundColor: "white",
                        borderBottom: "1px solid #e0e0e0",
                        pt: 2,
                        pb: 2,
                        zIndex: 10,
                        overflow: "auto",
                    }}
                >
                    <Container
                        maxWidth="lg"
                        sx={{
                            display: "flex",
                            margin: "0 auto",
                        }}
                    >
                        {data.secondLevelCategories
                            .filter(
                                (secondLevelCategory) =>
                                    secondLevelCategory._parentCategory._id ===
                                        topLevelCategory._id &&
                                    !secondLevelCategory.hidden
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
                                                    ._parentCategory._id ===
                                                    secondLevelCategory._id &&
                                                !thirdLevelCategory.hidden
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

export default CategoryList;
