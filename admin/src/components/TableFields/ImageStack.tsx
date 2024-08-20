import Image, { ImageProps } from "./Image";

interface ImageStackProps {
    images: ImageProps[];
}

const ImageStack = ({ images }: ImageStackProps) => {
    return (
        <div className="flex flex-row">
            {images.map((img, index) => {
                if (index < 4) {
                    return <Image src={img.src} alt={img.alt} />;
                }
            })}
        </div>
    );
};

export default ImageStack;
