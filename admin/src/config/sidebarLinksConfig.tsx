import { Email, MoveToInbox } from "@mui/icons-material";

export const sidebarLinksConfig = [
    { label: "Dashboard", to: "/", icon: <MoveToInbox /> },
    { label: "Products", to: "/products", icon: <Email /> },
    { label: "Customers", to: "/customers", icon: <MoveToInbox /> },
    { label: "Orders", to: "/orders", icon: <Email /> },
    { label: "Categories", to: "/categories", icon: <MoveToInbox /> },
    { label: "Weekly Overview", to: "/overview?type=weekly", icon: <Email /> },
    {
        label: "Monthly Overview",
        to: "/overview?type=monthly",
        icon: <MoveToInbox />,
    },
    { label: "Add Product", to: "/products/add", icon: <Email /> },
];
