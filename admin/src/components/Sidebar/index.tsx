const items = [
    { title: "Dashboard", to: "/" },
    { title: "Products", to: "/products" },
    { title: "Customers", to: "/customers" },
    { title: "Orders", to: "/orders" },
    { title: "Total Earnings", to: "/earnings" },
    { title: "Weekly Overview", to: "/overview?weekly" },
    { title: "Monthly Overview", to: "/overview?monthly" },
    { title: "Add Product", to: "/products/add" },
];

const Sidebar = () => {
    return (
        <div className="flex flex-col space-y-2">
            {items.map((item, index) => (
                <div></div>
            ))}
        </div>
    );
};

export default Sidebar;
