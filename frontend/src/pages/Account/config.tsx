import type { NavLink } from "@/components/NavLinksMenu";

export const config: NavLink[] = [
    {
        key: "my_account",
        label: "My account",
        subLinks: [
            {
                key: "overview",
                label: "Overview",
                to: "/account",
            },
            {
                key: "orders",
                label: "Orders",
                to: "/account/orders",
            },
            {
                key: "return_article",
                label: "Return Article",
                to: "/account/orders",
            },
            {
                key: "returns",
                label: "Returns",
                to: "/account/returns",
            },
            {
                key: "my_data",
                label: "My Data",
                to: "/account/details",
            },
        ],
    },
    {
        key: "data_and_privacy",
        label: "Data and privacy",
        subLinks: [
            {
                key: "preferences",
                label: "Preferences",
                to: "/account/preferences",
            },
        ],
    },
];
