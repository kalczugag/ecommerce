import { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import IconButtonTools from "./IconButtonTools";
import { useGetGroupedCategoriesQuery } from "@/store";
import { CategoryContainer, CategoryList } from "./Categories";
import CartDrawer from "../Cart/CartDrawer";
import Search from "./Search";
import MouseLeaveListener from "../MouseLeaveListener";

interface HeaderProps {
    topLabel?: string;
}

const Header = ({ topLabel }: HeaderProps) => {
    const [openCategories, setOpenCategories] = useState({
        isOpen: false,
        page: "",
    });

    const { data } = useGetGroupedCategoriesQuery({ sorted: true });

    return (
        <>
            {topLabel && (
                <Container
                    maxWidth={false}
                    disableGutters
                    sx={{
                        color: "white",
                        textAlign: "center",
                        padding: "5px",
                        "@media print": {
                            display: "none",
                        },
                    }}
                    className="bg-blue-primary"
                >
                    <Typography
                        variant="subtitle2"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {topLabel}
                    </Typography>
                </Container>
            )}
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "white",
                    boxShadow: "none",
                    borderBottom: "1px solid #e0e0e0",
                    color: "black",
                    "@media print": {
                        display: "none",
                    },
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar disableGutters>
                        <div className="flex items-center">
                            <Link to="/" className="mr-2 flex items-center">
                                <img
                                    src="/icons/logo.svg"
                                    alt="logo"
                                    style={{ height: "60px", width: "80px" }}
                                />
                            </Link>
                        </div>
                        <MouseLeaveListener
                            onMouseLeave={() =>
                                setOpenCategories({ isOpen: false, page: "" })
                            }
                        >
                            <CategoryContainer
                                data={data?.result}
                                setOpen={setOpenCategories}
                                openCategories={openCategories}
                            />
                            {data?.result && (
                                <CategoryList
                                    data={data.result}
                                    page={openCategories.page}
                                    isOpen={openCategories.isOpen}
                                    setOpen={setOpenCategories}
                                />
                            )}
                        </MouseLeaveListener>
                        <Search isMobile={false} />
                        <IconButtonTools />
                    </Toolbar>
                </Container>
            </AppBar>
            <CartDrawer />
        </>
    );
};

export default Header;
