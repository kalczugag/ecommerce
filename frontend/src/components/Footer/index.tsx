import { Link } from "react-router-dom";
import { footerLinks } from "@/constants/footerLinks";

const Footer = () => {
    const currYear = new Date().getFullYear();

    return (
        <footer className="flex flex-col text-center text-white text-lg">
            <div className="grid grid-cols-2 gap-12 p-4 py-12 bg-[#1A1A1A] md:grid-cols-4">
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
                <div className="text-sm">
                    <p>{currYear} &copy; Ecommerce</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
