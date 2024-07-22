import { Link } from "react-router-dom";
import { AppBar, Container, Toolbar } from "@mui/material";
import { Adb } from "@mui/icons-material";

const Header = () => {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "#1E1F20",
                boxShadow: "none",
                color: "white",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <div className="flex items-center flex-1 md:flex-none">
                        <div className="flex items-center mr-2 flex-grow ">
                            <Adb className="mr-1" />
                            <Link
                                to="/"
                                className="font-mono font-bold text-xl tracking-[.3rem] no-underline"
                            >
                                LOGO
                            </Link>
                        </div>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
