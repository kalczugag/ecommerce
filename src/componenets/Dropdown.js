import { useState } from "react";
import Button from "./Button";

const Dropdown = ({ options }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [choosenOption, setChoosenOption] = useState("-");

    const handleOptionClick = (name) => {
        setChoosenOption(name);
        handleShowDropdown();
    };

    const handleShowDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const renderedOptions = options.map((option) => {
        return (
            <div
                key={option.name}
                onClick={() => handleOptionClick(option.name)}
                className="cursor-pointer hover:bg-gray-600 opacity-90"
            >
                {option.name}
            </div>
        );
    });

    return (
        <div className="relative">
            <Button onClick={handleShowDropdown}>{choosenOption}</Button>
            {showDropdown && <div className="absolute">{renderedOptions}</div>}
        </div>
    );
};

export default Dropdown;
