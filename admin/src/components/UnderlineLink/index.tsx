import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";

interface UnderlineLinkProps {
    to: string;
    children: ReactNode;
}

const UnderlineLink = ({ children, to }: UnderlineLinkProps) => {
    const navigate = useNavigate();

    return (
        <Link component="button" type="button" onClick={() => navigate(to)}>
            {children}
        </Link>
    );
};

export default UnderlineLink;
