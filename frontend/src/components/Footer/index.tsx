import { Link } from "react-router-dom";
import { Container, Divider, IconButton, useMediaQuery } from "@mui/material";
import Copyright from "../Copyright";
import { FacebookRounded, X, YouTube } from "@mui/icons-material";

const Footer = () => {
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <footer className="flex flex-col bg-[#1A1A1A] text-white mt-auto print:hidden">
            <Container
                maxWidth="xl"
                disableGutters
                sx={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                }}
            >
                <div className="flex-1 flex justify-center py-8 md:py-20">
                    <div className="flex flex-col space-y-4">
                        <span>
                            <p>st. Człuchowska 92</p>
                            <p>01-360, Warsaw</p>
                            <p>Poland</p>
                        </span>
                        <span className="flex flex-wrap">
                            <p>Phone: </p>
                            <p>&nbsp;</p>
                            <p>+48 123 456 789</p>
                        </span>
                        <span className="flex flex-wrap">
                            <p>Email: </p>
                            <p>&nbsp;</p>
                            <p>info.example@gmail.com</p>
                        </span>
                    </div>
                </div>

                <Divider
                    orientation={isMobile ? "horizontal" : "vertical"}
                    flexItem
                    sx={{
                        borderColor: "#444",
                        ...(isMobile ? { my: 2 } : { mx: 2 }),
                    }}
                />

                <div className="flex-1 flex flex-col space-y-4 py-8 md:py-20">
                    <img
                        src="/icons/logoWhite.svg"
                        alt="logo"
                        style={{ color: "white", height: "50px" }}
                    />
                    <div className="flex items-center justify-center space-x-2">
                        <IconButton
                            sx={{
                                color: "white",
                                bgcolor: "#444",
                            }}
                        >
                            <FacebookRounded />
                        </IconButton>
                        <IconButton
                            sx={{
                                color: "white",
                                bgcolor: "#444",
                            }}
                        >
                            <X />
                        </IconButton>
                        <IconButton
                            sx={{
                                color: "white",
                                bgcolor: "#444",
                            }}
                        >
                            <YouTube />
                        </IconButton>
                    </div>
                </div>

                <Divider
                    orientation={isMobile ? "horizontal" : "vertical"}
                    flexItem
                    sx={{
                        borderColor: "#444",
                        ...(isMobile ? { my: 2 } : { mx: 2 }),
                    }}
                />

                <div className="flex-1 flex justify-evenly py-8 md:py-20">
                    <div className="flex flex-col items-start">
                        <Link to="#">About</Link>
                        <Link to="#">Blogs</Link>
                        <Link to="#">Contact</Link>
                        <Link to="#">FAQs</Link>
                    </div>
                    <div className="flex flex-col items-start">
                        <Link to="#">About</Link>
                        <Link to="#">Blogs</Link>
                        <Link to="#">Contact</Link>
                        <Link to="#">FAQs</Link>
                    </div>
                </div>
            </Container>

            <Divider
                orientation={isMobile ? "horizontal" : "vertical"}
                flexItem
                sx={{
                    borderColor: "#444",
                    ...(isMobile ? { my: 2 } : { mx: 2 }),
                }}
            />

            <Container
                maxWidth="xl"
                disableGutters
                sx={{
                    display: "flex",
                    gap: 4,
                    p: 2,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: isMobile ? "column" : "row",
                }}
            >
                <div className="flex flex-row space-x-4">
                    <Link to="#">About</Link>
                    <Divider
                        variant="middle"
                        orientation="vertical"
                        flexItem
                        sx={{ borderColor: "#444" }}
                    />
                    <Link to="#">Blogs</Link>
                    <Divider
                        variant="middle"
                        orientation="vertical"
                        flexItem
                        sx={{ borderColor: "#444" }}
                    />
                    <Link to="#">Contact</Link>
                    <Divider
                        variant="middle"
                        orientation="vertical"
                        flexItem
                        sx={{ borderColor: "#444" }}
                    />
                    <Link to="#">FAQs</Link>
                </div>
                <Copyright />
            </Container>
        </footer>
    );
};

export default Footer;
