import { useState } from "react";

interface ImagePickerProps {
    data: string[];
}

const ImagePicker = ({ data }: ImagePickerProps) => {
    const [selectedImage, setSelectedImage] = useState(0);

    const images = data.map((image, index) => (
        <img
            key={index}
            src={image}
            alt={`small image ${index}`}
            onMouseOver={() => setSelectedImage(index)}
            className="w-32 h-32 object-cover hover:shadow-md cursor-pointer"
        />
    ));

    return (
        <div className="flex flex-col-reverse md:space-x-10 md:flex-row">
            <div className="flex flex-row mt-10 space-x-2 md:mt-0 md:space-y-2 md:space-x-0 md:flex-col">
                {images}
            </div>
            <div className="md:w-[600px] ">
                <img
                    src={data[selectedImage]}
                    alt="main image"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default ImagePicker;
