import { Email, MoveToInbox } from "@mui/icons-material";

export const config = [
    { label: "Dashboard", to: "/", icon: <MoveToInbox /> },
    { label: "Products", to: "/products", icon: <Email /> },
    { label: "Customers", to: "/customers", icon: <MoveToInbox /> },
    { label: "Orders", to: "/orders", icon: <Email /> },
    { label: "Total Earnings", to: "/earnings", icon: <MoveToInbox /> },
    { label: "Weekly Overview", to: "/overview?weekly", icon: <Email /> },
    {
        label: "Monthly Overview",
        to: "/overview?monthly",
        icon: <MoveToInbox />,
    },
    { label: "Add Product", to: "/products/add", icon: <Email /> },
];
