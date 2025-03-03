import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";

interface UnderlineLinkProps extends LinkProps {
    children: ReactNode;
}

const UnderlineLink = ({ children, ...props }: UnderlineLinkProps) => {
    return (
        <Link
            {...props}
            className="text-[#197AD4] underline decoration-[#70A2D9] hover:decoration-[#197AD4] dark:text-text-dark dark:decoration-transparent dark:hover:decoration-text-dark"
        >
            {children}
        </Link>
    );
};

export default UnderlineLink;
