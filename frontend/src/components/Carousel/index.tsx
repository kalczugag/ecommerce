import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Slider, { Settings } from "react-slick";
import Loading from "../Loading";
import { Container } from "@mui/material";

const config: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: (
        <KeyboardArrowRight
            sx={{
                display: "block",
                color: "#FFFFFF",
                bgcolor: "#1A1A1A",
                opacity: 0.95,
                fontSize: 40,
                "&:hover": {
                    color: "#FFFFFF",
                    bgcolor: "#1A1A1A",
                    boxShadow: "inset 0 0 0 2px #a0a0a0",
                },
                zIndex: 1,
            }}
        />
    ),
    prevArrow: (
        <KeyboardArrowLeft
            sx={{
                display: "block",
                color: "#FFFFFF",
                bgcolor: "#1A1A1A",
                opacity: 0.95,
                fontSize: 40,
                "&:hover": {
                    color: "#FFFFFF",
                    bgcolor: "#1A1A1A",
                    boxShadow: "inset 0 0 0 2px #a0a0a0",
                },
                zIndex: 1,
            }}
        />
    ),
    responsive: [
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

interface CarouselProps {
    content: JSX.Element[];
    isLoading: boolean;
    colors: {
        primary: string;
        secondary: string;
    };
}

const Carousel = ({ content, isLoading, colors }: CarouselProps) => {
    const { primary, secondary } = colors;

    return (
        <Loading isLoading={isLoading}>
            <Container
                maxWidth={false}
                sx={{
                    paddingY: 4,
                    margin: 0,
                }}
                style={{
                    color: secondary ? secondary : "black",
                    backgroundColor: primary ? primary : "white",
                }}
            >
                <Container
                    maxWidth="xl"
                    sx={{
                        padding: 2,
                    }}
                >
                    <Slider {...config}>{content}</Slider>
                </Container>
            </Container>
        </Loading>
    );
};

export default Carousel;
