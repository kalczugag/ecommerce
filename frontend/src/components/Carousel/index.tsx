import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

interface CarouselProps {
    content: JSX.Element[];
}

const CustomCarousel = ({ content }: CarouselProps) => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 2,
            slidesToSlide: 1, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    return (
        <Carousel
            responsive={responsive}
            autoPlaySpeed={1000}
            transitionDuration={500}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            className="h-full w-full"
            keyBoardControl
            infinite
            showDots
            ssr
        >
            {content}
        </Carousel>
    );
};

export default CustomCarousel;
