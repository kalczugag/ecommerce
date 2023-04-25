const Table = ({ config, data }) => {
    const renderedHeaders = config.map((column) => {
        return (
            <th
                key={column.label}
                className="border px-4 py-2 lg:px-6 lg:py-4 bg-gray-200 font-medium text-gray-700 uppercase tracking-wider"
            >
                {column.label}
            </th>
        );
    });

    const renderedRows = data.map((rowData) => {
        const renderedCells = config.map((column) => {
            return (
                <td
                    key={column.label}
                    className="border px-4 py-2 lg:px-6 lg:py-4"
                >
                    {column.render(rowData)}
                </td>
            );
        });

        return <tr key={rowData.name}>{renderedCells}</tr>;
    });

    return (
        <div className="w-3/4 mx-auto">
            <table className="table-auto border-spacing-2 w-full lg:w-auto">
                <thead>
                    <tr className="border-b-2">{renderedHeaders}</tr>
                </thead>
                <tbody>{renderedRows}</tbody>
            </table>
        </div>
    );
};

export default Table;
