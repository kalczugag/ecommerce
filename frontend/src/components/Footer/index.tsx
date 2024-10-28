import {
    ApartmentOutlined,
    StoreOutlined,
    FolderOpenOutlined,
    CopyrightOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
    const currYear = new Date().getFullYear();

    return (
        <footer className="flex flex-col text-center text-white text-lg">
            <div className="grid grid-cols-2 gap-12 p-4 py-12 bg-[#5146E7] md:grid-cols-4">
                <div className="space-y-2">
                    <h4 className="flex justify-center space-x-1 text-xl font-bold">
                        <ApartmentOutlined />
                        <span>Company</span>
                    </h4>
                    <ul>
                        <li>
                            <Link to="#">About</Link>
                        </li>
                        <li>
                            <Link to="#">Blog</Link>
                        </li>
                        <li>
                            <Link to="#">Career</Link>
                        </li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h4 className="flex justify-center space-x-1 text-xl font-bold">
                        <StoreOutlined />
                        <span>Solutions</span>
                    </h4>
                    <ul>
                        <li>
                            <Link to="#">Marketing</Link>
                        </li>
                        <li>
                            <Link to="#">Analytics</Link>
                        </li>
                        <li>
                            <Link to="#">Commerce</Link>
                        </li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h4 className="flex justify-center space-x-1 text-xl font-bold">
                        <FolderOpenOutlined />
                        <span>Documentation</span>
                    </h4>
                    <ul>
                        <li>
                            <Link to="#">Guides</Link>
                        </li>
                        <li>
                            <Link to="#">Api Status</Link>
                        </li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h4 className="flex justify-center space-x-1 text-xl font-bold">
                        <CopyrightOutlined />
                        <span>Legal</span>
                    </h4>
                    <ul>
                        <li>
                            <Link to="#">Claim</Link>
                        </li>
                        <li>
                            <Link to="#">Privacy</Link>
                        </li>
                        <li>
                            <Link to="#">Terms</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="bg-[#1A1A1A] p-4 py-8 text-sm">
                <p>{currYear} &copy; Ecommerce</p>
            </div>
        </footer>
    );
};

export default Footer;
