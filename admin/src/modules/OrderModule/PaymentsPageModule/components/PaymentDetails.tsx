interface PaymentDetailsProps {
    amount: number;
    date: string;
}

const PaymentDetails = ({ amount, date }: PaymentDetailsProps) => {
    return (
        <div className="flex-1 flex flex-col space-y-4">
            <div>
                <span className="font-bold">Date: </span>
                <span>{date}</span>
            </div>
            <div>
                <span className="font-bold">Amount: </span>
                <span>${amount}</span>
            </div>
            <div className="flex flex-col space-y-1">
                <span className="font-bold">Account Details: </span>
                <span className="text-sm">
                    Account data storage or SSL has been disabled.
                </span>
            </div>
        </div>
    );
};

export default PaymentDetails;
