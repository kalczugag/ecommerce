import { Breadcrumbs, Typography } from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import { Link as LinkRouter, useLocation } from "react-router-dom";

interface RouterBreadcrumbsProps {
    rootLink?: { path: string; label: string };
    breadcrumbNameMap: { [key: string]: string };
}

const RouterBreadcrumbs = ({
    rootLink,
    breadcrumbNameMap,
}: RouterBreadcrumbsProps) => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    // if (pathnames.length <= 1 && !rootLink) {
    //     return <div />;
    // }

    return (
        <Breadcrumbs aria-label="breadcrumb" separator={<KeyboardArrowRight />}>
            {rootLink && (
                <LinkRouter
                    className="hover:underline"
                    color="inherit"
                    to={rootLink.path}
                >
                    {rootLink.label}
                </LinkRouter>
            )}
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                return last ? (
                    <Typography key={to} sx={{ color: "text.primary" }}>
                        {breadcrumbNameMap[to]}
                    </Typography>
                ) : (
                    <LinkRouter
                        className="hover:underline"
                        color="inherit"
                        to={to}
                        key={to}
                    >
                        {breadcrumbNameMap[to]}
                    </LinkRouter>
                );
            })}
        </Breadcrumbs>
    );
};

export default RouterBreadcrumbs;
