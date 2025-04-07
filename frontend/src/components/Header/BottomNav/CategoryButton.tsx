import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CategoryButtonProps {
    name: string;
    highlighted?: boolean;
    onClick: () => void;
    onMouseOver: (name: string) => void;
}

const CategoryButton = ({
    name,
    highlighted,
    onClick,
    onMouseOver,
}: CategoryButtonProps) => {
    const navigate = useNavigate();

    const handleOpenCategories = () => {
        onMouseOver(name);
    };

    const handleClick = () => {
        navigate(name.toLocaleLowerCase());
        onClick();
    };

    return (
        <Button
            color="inherit"
            sx={{
                textTransform: "none",
                boxShadow: "none",
                py: 1,
                borderBottom: "1px solid transparent",
                zIndex: 20,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                backgroundColor: "transparent",
                "&:hover": {
                    backgroundColor: "transparent",
                    borderBottom: "1px solid black",
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                },
                "&:focus": {
                    backgroundColor: "transparent",
                },
                ...(highlighted && {
                    color: "#EF4444",
                    fontWeight: "bold",
                }),
            }}
            onClick={handleClick}
            onMouseOver={handleOpenCategories}
        >
            {name}
        </Button>
    );
};

export default CategoryButton;
