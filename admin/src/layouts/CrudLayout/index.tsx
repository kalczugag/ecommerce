import { ReactNode } from "react";
import { Link as RouterLink, useParams, useLocation } from "react-router-dom";
import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";

interface CrudLayoutProps {
    headerPanel?: ReactNode;
    children: ReactNode;
}

const labelMap: Record<string, string> = {
    orders: "Orders",
    payments: "Payments",
    reviews: "Reviews",
    campaigns: "Campaigns",
    categories: "Categories",
    products: "Products",
    customers: "Customers",
};

const CrudLayout = ({ headerPanel, children }: CrudLayoutProps) => {
    const { pathname } = useLocation();

    const segments = pathname.split("/").filter(Boolean);

    const knownActions = ["add", "edit", "new", "view", "create"];

    const breadcrumbs = segments.map((segment, index) => {
        const path = "/" + segments.slice(0, index + 1).join("/");

        let label = segment;

        if (index === 0) {
            label = labelMap[segment] ?? segment;
        } else if (knownActions.includes(segment.toLowerCase())) {
            label = segment.charAt(0).toUpperCase() + segment.slice(1);
        } else {
            label = "Edit";
        }

        return {
            label,
            path,
            isLast: index === segments.length - 1,
        };
    });

    const lastElement = breadcrumbs[breadcrumbs.length - 1];
    const title = breadcrumbs.length === 1 ? "List" : lastElement.label;

    return (
        <Stack spacing={4}>
            <Stack spacing={1}>
                <Stack>
                    <Typography variant="h5">{title}</Typography>
                </Stack>
                <Breadcrumbs>
                    <Link
                        component={RouterLink}
                        to="/"
                        underline="hover"
                        color="inherit"
                    >
                        Home
                    </Link>
                    {breadcrumbs.map(({ label, path, isLast }) =>
                        isLast ? (
                            <Typography key={path} color="text.primary">
                                {label}
                            </Typography>
                        ) : (
                            <Link
                                key={path}
                                component={RouterLink}
                                to={path}
                                underline="hover"
                                color="inherit"
                            >
                                {label}
                            </Link>
                        )
                    )}
                </Breadcrumbs>
            </Stack>
            {headerPanel && <Box>{headerPanel}</Box>}
            {children}
        </Stack>
    );
};

export default CrudLayout;
