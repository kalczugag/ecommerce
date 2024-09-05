import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { GroupedCategories } from "@/types/Category";

interface CategoriesProps {
    data?: GroupedCategories;
    page: string;
}

const Categories = ({ data, page }: CategoriesProps) => {
    if (!data) {
        return null;
    }

    const topLevelCategory = data.topLevelCategories.find(
        (category) => category.name.toLowerCase() === page.toLowerCase()
    );

    if (!topLevelCategory) {
        return null;
    }

    return (
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
                            <h3 className="font-bold">
                                {secondLevelCategory.name}
                            </h3>

                            {data.thirdLevelCategories
                                .filter(
                                    (thirdLevelCategory) =>
                                        thirdLevelCategory.parentCategory
                                            ._id === secondLevelCategory._id
                                )
                                .map((thirdLevelCategory) => (
                                    <li key={thirdLevelCategory._id}>
                                        <Link
                                            to={
                                                page.toLowerCase() +
                                                "/" +
                                                thirdLevelCategory.name
                                                    .toLowerCase()
                                                    .replace(/\s+/g, "-")
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
    );
};

export default Categories;
