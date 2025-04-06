import { Save } from "@mui/icons-material";
import { Button } from "@mui/material";

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
    return <Button>x</Button>;
};

export default CategoryButton;
