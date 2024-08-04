import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "@/hooks/useStore";
import { Adb } from "@mui/icons-material";
import TitledIconButton from "../TitledIconButton";

const Sidebar = () => {
    const { pathname } = useLocation();
    const { content } = useAppSelector((state) => state.sidebar);

    return (
        <div className="hidden flex-col py-6 h-screen bg-light-secondary w-[215.156px] dark:bg-darker md:flex">
            <div className="flex items-center px-6 mb-10">
                <Adb className="mr-1" />
                <Link
                    to="/"
                    className="font-mono font-bold text-xl tracking-[.3rem] no-underline"
                >
                    LOGO
                </Link>
            </div>
            <div className="flex flex-col space-y-2">
                {content.map((item, index) => (
                    <TitledIconButton
                        key={item.label + "_" + index.toString()}
                        {...item}
                        active={pathname === item.to}
                    />
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
