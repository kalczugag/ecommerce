import { Email, MoveToInbox } from "@mui/icons-material";

export const config = [
    { label: "Dashboard", to: "/", icon: <MoveToInbox /> },
    { label: "Products", to: "/products", icon: <Email /> },
    { label: "Customers", to: "/customers", icon: <MoveToInbox /> },
    { label: "Orders", to: "/orders", icon: <Email /> },
    { label: "Weekly Overview", to: "/overview?type=weekly", icon: <Email /> },
    {
        label: "Monthly Overview",
        to: "/overview?type=monthly",
        icon: <MoveToInbox />,
    },
    { label: "Add Product", to: "/products/add", icon: <Email /> },
];
