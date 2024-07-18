import { Container, Typography } from "@mui/material";

const Dashboard = () => {
    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={{
                height: "70vh",
                bgcolor: "#80203D",
                color: "white",
                marginY: "40px",
            }}
        >
            <Typography
                variant="h1"
                component="h1"
                sx={{ textAlign: "center" }}
            >
                test
            </Typography>
        </Container>
    );
};

export default Dashboard;
