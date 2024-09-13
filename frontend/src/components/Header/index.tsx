import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
} from "@mui/material";
import { Adb } from "@mui/icons-material";
import Categories from "./Categories";
import AccountTools from "./AccountTools";
import { useGetGroupedCategoriesQuery } from "@/store";

interface HeaderProps {
    deliveryBar?: string;
}

const Header = ({ deliveryBar }: HeaderProps) => {
    const navigate = useNavigate();

    const { data } = useGetGroupedCategoriesQuery({ sorted: true });

    const [openCategories, setOpenCategories] = useState<{
        isOpen: boolean;
        page: string;
    }>({ isOpen: false, page: "" });

    const handleMouseOver = (page: string) => {
        setOpenCategories({ isOpen: true, page });
    };

    const handleMouseLeave = () => {
        setOpenCategories((prevState) => ({
            ...prevState,
            isOpen: false,
        }));
    };

    const handleCategoriesMouseEnter = () => {
        setOpenCategories((prevState) => ({
            ...prevState,
            isOpen: true,
        }));
    };

    return (
        <>
            {deliveryBar && (
                <Container
                    maxWidth={false}
                    disableGutters
                    sx={{
                        bgcolor: "#5146E7",
                        color: "white",
                        textAlign: "center",
                        padding: "5px",
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {deliveryBar}
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
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <div className="flex items-center flex-1 md:flex-none">
                            <div className="flex items-center mr-2 flex-grow ">
                                <Adb className="mr-1 text-black" />
                                <Link
                                    to="/"
                                    className="font-mono font-bold text-xl tracking-[.3rem] text-black no-underline"
                                >
                                    LOGO
                                </Link>
                            </div>
                        </div>
                        <Box className="hidden flex-grow md:flex">
                            {data?.data
                                ? data?.data.topLevelCategories.map(
                                      ({ name }) => (
                                          <Button
                                              key={name}
                                              onClick={() =>
                                                  navigate(name.toLowerCase())
                                              }
                                              onMouseOver={() =>
                                                  handleMouseOver(name)
                                              }
                                              sx={{
                                                  my: 2,
                                                  color: "black",
                                                  display: "block",
                                              }}
                                          >
                                              {name}
                                          </Button>
                                      )
                                  )
                                : null}
                        </Box>
                        <AccountTools />
                    </Toolbar>
                </Container>
            </AppBar>
            {openCategories.isOpen && (
                <Box
                    onMouseEnter={handleCategoriesMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Categories page={openCategories.page} data={data?.data} />
                </Box>
            )}
        </>
    );
};

export default Header;
