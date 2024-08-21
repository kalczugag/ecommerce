const Review = ({ values }: { values: Record<string, unknown> }) => {
    const isEmpty = Object.keys(values).length === 0;

    if (isEmpty) {
        return <div>No data available</div>;
    }

    return (
        <div className="flex flex-col">
            {Object.keys(values).map((key) => {
                if (key === "__v" || key === "_id") {
                    return null;
                }
                return (
                    <div key={key} className="py-1">
                        <strong>{key}:</strong> {String(values[key])}
                    </div>
                );
            })}
        </div>
    );
};

export default Review;
