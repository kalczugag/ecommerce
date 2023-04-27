import { useLocation } from "react-router-dom";

const Item = () => {
    const location = useLocation();
    const { title, description, price } = location.state || {};

    return (
        <div>
            {title}
            {description}
            {price}
        </div>
    );
};

export default Item;
