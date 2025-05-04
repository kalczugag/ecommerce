import {
    ArrowForward,
    KeyboardArrowLeft,
    KeyboardArrowRight,
} from "@mui/icons-material";
import Slider, { ResponsiveObject, Settings } from "react-slick";
import { Button, Container } from "@mui/material";
import Loading from "../Loading";
import type { FeaturedCampaign } from "@/types/FeaturedCampaign";

const config: Settings = {
    dots: false,
    infinite: false,
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
};

interface CarouselProps {
    name?: string;
    description?: string;
    content: JSX.Element[];
    isLoading: boolean;
    bgColor: FeaturedCampaign["bgColor"];
    textColor: FeaturedCampaign["textColor"];
    customConfig?: ResponsiveObject[];
}

const InfiniteCarousel = ({
    name,
    description,
    content,
    isLoading,
    bgColor,
    textColor,
    customConfig,
}: CarouselProps) => {
    return (
        <Loading isLoading={isLoading}>
            {name && (
                <Container
                    maxWidth={false}
                    sx={{
                        paddingY: 4,
                        margin: 0,
                        color: textColor.primary,
                        bgcolor: bgColor.secondary,
                    }}
                >
                    <Container
                        maxWidth="lg"
                        sx={{
                            padding: 2,
                        }}
                        className="space-y-4"
                    >
                        <h1 className="text-3xl font-bold">{name}</h1>
                        {description && (
                            <p className="md:w-1/2">{description}</p>
                        )}
                        <Button
                            sx={{
                                color: textColor.primary,
                                paddingY: 1,
                            }}
                            endIcon={<ArrowForward />}
                        >
                            Explore
                        </Button>
                    </Container>
                </Container>
            )}
            <Container
                maxWidth={false}
                sx={{
                    paddingY: 4,
                    margin: 0,
                    color: textColor.primary,
                    bgcolor: bgColor.primary,
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        padding: 2,
                    }}
                >
                    <Slider
                        {...config}
                        responsive={
                            customConfig || [
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
                            ]
                        }
                    >
                        {content}
                    </Slider>
                </Container>
            </Container>
        </Loading>
    );
};

export default InfiniteCarousel;
