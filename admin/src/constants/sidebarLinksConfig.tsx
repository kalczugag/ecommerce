import {
    Dashboard,
    ShoppingCart,
    Category,
    People,
    BarChart,
    Layers,
    Storage,
} from "@mui/icons-material";
import type { NavLink } from "@/components/NavLinksMenu";

interface LinksProps {
    sectionLabel: string;
    elements: NavLink[];
}

export const navLinks: LinksProps[] = [
    {
        sectionLabel: "Main Items",
        elements: [
            {
                key: "dashboard",
                label: "Dashboard",
                to: "/",
                icon: <Dashboard />,
            },
            {
                key: "manage",
                label: "Manage",
                icon: <Storage />,
                subLinks: [
                    {
                        key: "orders_list",
                        label: "Orders",
                        to: "/orders",
                    },
                    {
                        key: "payments_list",
                        label: "Payments",
                        to: "/payments",
                    },
                    {
                        key: "product_reviews",
                        label: "Product Reviews",
                        to: "/reviews",
                    },
                    {
                        key: "capmaigns",
                        label: "Campaigns",
                        to: "/campaigns",
                    },
                    {
                        key: "categories",
                        label: "Categories",
                        to: "/categories",
                    },
                ],
            },
            {
                key: "products",
                label: "Products",
                subLinks: [
                    {
                        key: "products_list",
                        label: "List",
                        to: "/products",
                    },
                    {
                        key: "product_add",
                        label: "Add",
                        to: "/products/add",
                    },
                ],
            },
            {
                key: "customers",
                label: "Customers",
                icon: <People />,
                subLinks: [
                    {
                        key: "customers_list",
                        label: "List",
                        to: "/customers",
                    },
                    {
                        key: "customers_add",
                        label: "Add",
                        to: "/customers/add",
                    },
                ],
            },
        ],
    },
    {
        sectionLabel: "Analytics",
        elements: [
            {
                key: "reports",
                label: "Reports",
                icon: <BarChart />,
                subLinks: [
                    {
                        key: "overview_weekly",
                        label: "Weekly Overview",
                        to: "/overview?type=weekly",
                    },
                    {
                        key: "overview_monthly",
                        label: "Monthly Overview",
                        to: "/overview?type=monthly",
                    },
                ],
            },
            {
                key: "integrations",
                label: "Integrations",
                to: "/integrations",
                icon: <Layers />,
            },
        ],
    },
];
