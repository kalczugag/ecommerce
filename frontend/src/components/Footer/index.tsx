import { Link } from "react-router-dom";
import { footerLinks } from "@/constants/footerLinks";
import { Container, Divider } from "@mui/material";

const Footer = () => {
    const currYear = new Date().getFullYear();

    return (
        <footer className="text-center bg-[#1A1A1A] text-white text-lg mt-auto">
            <Container maxWidth="xl" disableGutters>
                <div className="grid grid-cols-2 gap-12 py-12 md:grid-cols-4">
                    {footerLinks.map(({ label, icon, links }) => (
                        <div key={label} className="space-y-2">
                            <h4 className="flex items-center justify-center space-x-1 text-xl font-bold">
                                {icon}
                                <span>{label}</span>
                            </h4>
                            <ul>
                                {links.map(({ label, to }) => (
                                    <li key={label}>
                                        <Link to={to}>{label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <Divider sx={{ bgcolor: "gray" }} />
                <div className="text-sm text-start p-4">
                    <p>{currYear} &copy; Ecommerce</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
