const Copyright = () => {
    const currYear = new Date().getFullYear();

    return (
        <div className="text-sm text-start p-4">
            <p>{currYear} &copy; EVERWEAR</p>
        </div>
    );
};

export default Copyright;
