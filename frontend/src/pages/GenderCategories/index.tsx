import { useLocation } from "react-router-dom";
import Categories from "../../components/Header/Categories";

const GenderCategories = () => {
    const { pathname } = useLocation();
    const page = pathname.slice(1);

    return <Categories page={page} />;
};

export default GenderCategories;
