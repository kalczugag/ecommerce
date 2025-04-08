import { Container, Typography } from "@mui/material";

const FeaturedBar = ({ label }: { label?: string }) => {
    return (
        <>
            {label && (
                <Container
                    maxWidth={false}
                    disableGutters
                    sx={{
                        color: "white",
                        textAlign: "center",
                        padding: "5px",
                        "@media print": {
                            display: "none",
                        },
                    }}
                    className="bg-blue-primary"
                >
                    <Typography
                        variant="subtitle2"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {label}
                    </Typography>
                </Container>
            )}
        </>
    );
};

export default FeaturedBar;
