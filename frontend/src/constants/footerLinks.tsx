import {
    ApartmentOutlined,
    CopyrightOutlined,
    FolderOpenOutlined,
    StoreOutlined,
} from "@mui/icons-material";

export const footerLinks = [
    {
        label: "Company",
        icon: <ApartmentOutlined />,
        links: [
            {
                label: "About",
                to: "",
            },
            {
                label: "Blog",
                to: "",
            },
            {
                label: "Career",
                to: "",
            },
        ],
    },
    {
        label: "Solutions",
        icon: <StoreOutlined />,
        links: [
            {
                label: "Marketing",
                to: "",
            },
            {
                label: "Analytics",
                to: "",
            },
            {
                label: "Commerce",
                to: "",
            },
        ],
    },
    {
        label: "Documentation",
        icon: <FolderOpenOutlined />,
        links: [
            {
                label: "Guides",
                to: "",
            },
            {
                label: "Api Status",
                to: "",
            },
        ],
    },
    {
        label: "Legal",
        icon: <CopyrightOutlined />,
        links: [
            {
                label: "Claim",
                to: "",
            },
            {
                label: "Privacy",
                to: "",
            },
            {
                label: "Terms",
                to: "",
            },
        ],
    },
];
