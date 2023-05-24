const CheckoutStatusBar = ({ active }) => {
    let fields = [];
    for (let i = 1; i <= 3; i++) {
        fields.push(
            <div
                key={i}
                className={`
                flex w-8 h-8 border border-gray-700 rounded-full justify-center items-center
                ${active === i ? "text-white bg-gray-600" : ""}
                `}
            >
                {i}
            </div>
        );
    }

    return (
        <div className="w-1/4 mx-auto flex flex-row justify-around items-center">
            {fields}
        </div>
    );
};

export default CheckoutStatusBar;
