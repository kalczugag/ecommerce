import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { categories, subcategories } from "./data";

const Categories = ({ page }: { page: string }) => {
    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                position: "absolute",
                backgroundColor: "white",
                padding: "20px",
                borderBottom: "1px solid #e0e0e0",
            }}
        >
            <Container
                maxWidth="xl"
                sx={{
                    display: "flex",
                }}
            >
                {categories.map((category) => (
                    <ul key={category._id} className="mr-12 space-y-2">
                        <h3 className="font-bold">{category.label}</h3>
                        {subcategories.map((subcategory) => {
                            if (
                                page.toLowerCase() ===
                                    subcategory.gender.toLowerCase() &&
                                category._id === subcategory.categoryId
                            ) {
                                return (
                                    <li key={subcategory._id}>
                                        <Link
                                            to={subcategory.label.toLowerCase()}
                                        >
                                            {subcategory.label}
                                        </Link>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                ))}
            </Container>
        </Container>
    );
};

export default Categories;
