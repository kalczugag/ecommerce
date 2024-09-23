import { Backdrop, CircularProgress } from "@mui/material";

interface Props {
    isLoading: boolean;
}

const LoadingBackdrop = ({ isLoading = false }: Props) => {
    return (
        <div>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};
export default LoadingBackdrop;
