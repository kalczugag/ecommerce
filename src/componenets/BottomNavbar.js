import "../styles/BottomNavbarLinks.css";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useThunk } from "../hooks/use-thunk";
import { fetchCategories } from "../store";

const BottomNavbar = () => {
    const location = useLocation();
    const [doFetchCategories] = useThunk(fetchCategories);

    useEffect(() => {
        doFetchCategories();
    }, [doFetchCategories]);

    const data = {
        women: [
            { label: "Tops" },
            { label: "Dresses" },
            { label: "Bottoms" },
            { label: "Outerwear" },
            { label: "Activewear" },
            { label: "Swimwear" },
            { label: "Accessories" },
        ],
        men: [
            { label: "Tops" },
            { label: "Bottoms" },
            { label: "Outerwear" },
            { label: "Activewear" },
            { label: "Swimwear" },
            { label: "Suits" },
            { label: "Accessories" },
        ],
    };

    const isWomenOrMen = location.pathname.startsWith("/men-home")
        ? "men"
        : "women";
    const renderedCategories = data[isWomenOrMen].map((cat) => (
        <Link
            key={cat.label}
            to={`/${isWomenOrMen}-home/${cat.label.toLowerCase()}`}
            className="expand-link ease-in-out duration-100 hover:border-b"
        >
            {cat.label}
        </Link>
    ));

    return (
        <nav className="absolute left-0 right-0 h-8 bg-gray-600 shadow-md text-white">
            <div className="h-full max-w-7xl hidden justify-between items-center mx-auto px-2 sm:px-6 md:flex lg:px-8">
                <div className="space-x-4">{renderedCategories}</div>
            </div>
        </nav>
    );
};

export default BottomNavbar;
