const Copyright = () => {
    const currYear = new Date().getFullYear();

    return (
        <div className="text-sm text-start text-gray-500">
            <p>{currYear} &copy; Ecommerce</p>
        </div>
    );
};

export default Copyright;
