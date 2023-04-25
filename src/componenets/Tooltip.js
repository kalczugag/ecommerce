import React from "react";
import PropTypes from "prop-types";

const Tooltip = ({ children, text }) => {
    const [showTooltip, setShowTooltip] = React.useState(false);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <div className="relative inline-block">
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="inline-block"
            >
                {children}
            </div>
            {showTooltip && (
                <div className="bg-gray-800 text-white rounded-lg p-2 text-sm absolute bottom-full left-1/2 transform -translate-x-1/2">
                    {text}
                </div>
            )}
        </div>
    );
};

Tooltip.propTypes = {
    children: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
};

export default Tooltip;
