import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

const SearchBar = ({ placeholder, className, type, search, what }) => {
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state[what].searchTerm);

    const handleChangeSearchTerm = (event) => {
        if (type === "number") {
            dispatch(search(parseInt(event.target.value)) || 0);
        } else {
            dispatch(search(event.target.value));
        }
    };

    const inputClassNames = classNames(
        "shadow-sm border border-gray-300 rounded-xl w-1/3 my-3 px-2 p-1 duration-200 hover:shadow-md focus:shadow-md",
        className
    );

    return (
        <>
            <input
                type={type}
                value={type === "number" ? searchTerm || "" : searchTerm}
                placeholder={placeholder}
                onChange={handleChangeSearchTerm}
                className={inputClassNames}
            />
        </>
    );
};

export default SearchBar;
