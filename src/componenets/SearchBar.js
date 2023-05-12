import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { changeOrderSearchTerm } from "../store";

const SearchBar = ({ placeholder, className, type }) => {
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.orders.searchTerm);

    const handleChangeSearchTerm = (event) => {
        dispatch(changeOrderSearchTerm(event.target.value) || 0);
    };

    const inputClassNames = classNames(
        "shadow-sm border border-gray-300 rounded-xl w-1/3 my-3 px-2 p-1 duration-200 hover:shadow-md focus:shadow-md",
        className
    );

    return (
        <>
            <input
                type={type}
                value={searchTerm}
                placeholder={placeholder}
                onChange={handleChangeSearchTerm}
                className={inputClassNames}
            />
        </>
    );
};

export default SearchBar;
