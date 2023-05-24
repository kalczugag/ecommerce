import { useState } from "react";
import CheckoutStatusBar from "../componenets/CheckoutStatusBar";
import Button from "../componenets/Button";

const Checkout = () => {
    const [activePoint, setActivePoint] = useState(0);

    const handleNextStep = () => {
        if (activePoint >= 0 && activePoint < 2) {
            setActivePoint(activePoint + 1);
        }
    };

    const handlePreviousStep = () => {
        if (activePoint > 0 && activePoint <= 3) {
            setActivePoint(activePoint - 1);
        }
    };

    return (
        <div className="relative flex flex-col">
            <CheckoutStatusBar active={activePoint + 1} />
            <div className="absolute bottom-0 flex flex-row justify-center space-x-1">
                <Button primary onClick={handlePreviousStep}>
                    Previous
                </Button>
                <Button primary onClick={handleNextStep}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export default Checkout;
