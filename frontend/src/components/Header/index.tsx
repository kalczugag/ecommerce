import { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { Adb } from "@mui/icons-material";
import IconButtonTools from "./IconButtonTools";
import { useGetGroupedCategoriesQuery } from "@/store";
import { CategoryContainer, CategoryList } from "./Categories";

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
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <div className="flex items-center md:flex-none md:flex">
                            <div className="flex items-center mr-2 flex-grow ">
                                <Adb className="mr-1 text-black" />
                                <Link
                                    to="/"
                                    className="hidden font-mono font-bold text-xl tracking-[.3rem] text-black no-underline md:block"
                                >
                                    LOGO
                                </Link>
                            </div>
                        </div>
                        <CategoryContainer
                            data={data?.data}
                            setOpen={setOpenCategories}
                            openCategories={openCategories}
                        />
                        <IconButtonTools />
                    </Toolbar>
                </Container>
            </AppBar>
            {data?.data && (
                <CategoryList
                    data={data.data}
                    page={openCategories.page}
                    isOpen={openCategories.isOpen}
                    setOpen={setOpenCategories}
                />
            )}
        </>
    );
};

export default Header;
