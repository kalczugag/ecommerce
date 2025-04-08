import { Link } from "react-router-dom";
import { Toolbar, Container } from "@mui/material";
import CartDrawer from "../../Cart/CartDrawer";
import Search from "./Search";
import IconButtonTools from "./IconButtonTools";

interface TopHeaderProps {
    topLabel?: string;
}

const TopHeader = ({ topLabel }: TopHeaderProps) => {
    return (
        <>
            <Container maxWidth="lg">
                <Toolbar disableGutters id="back-to-top-anchor">
                    <div className="flex items-center">
                        <Link to="/" className="mr-2 flex items-center">
                            <img
                                src="/icons/logo.svg"
                                alt="logo"
                                style={{ height: "60px", width: "100px" }}
                            />
                        </Link>
                    </div>
                    <Search isMobile={false} />
                    <IconButtonTools />
                </Toolbar>
            </Container>
            <CartDrawer />
        </>
    );
};

export default TopHeader;
