import { useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";

interface ImagePickerProps {
    data: string[];
}

const ImagePicker = ({ data }: ImagePickerProps) => {
    const isMobile = useIsMobile(1280);
    const [selectedImage, setSelectedImage] = useState(0);

    const visibleImages = isMobile
        ? selectedImage < 2
            ? data.slice(0, 3)
            : data.slice(1, 4)
        : data;

    return (
        <div className="flex flex-col-reverse xl:space-x-10 xl:flex-row">
            <div className="flex flex-row justify-center space-x-2 xl:justify-normal xl:mt-0 xl:space-y-2 xl:space-x-0 xl:flex-col">
                {visibleImages.map((image, index) => {
                    const absoluteIndex = isMobile
                        ? selectedImage < 2
                            ? index
                            : index + 1
                        : index;

                    return (
                        <img
                            key={absoluteIndex}
                            src={`${image}?imwidth=128`}
                            alt={`small image ${absoluteIndex}`}
                            onMouseOver={
                                !isMobile
                                    ? () => setSelectedImage(absoluteIndex)
                                    : undefined
                            }
                            onClick={
                                isMobile
                                    ? () => setSelectedImage(absoluteIndex)
                                    : undefined
                            }
                            className={`w-32 h-32 object-cover cursor-pointer transition-all duration-300 ${
                                selectedImage === absoluteIndex
                                    ? "shadow-lg"
                                    : ""
                            }`}
                        />
                    );
                })}
            </div>
            {isMobile && (
                <div className="flex flex-col items-center my-4">
                    <div className="flex space-x-2 mt-2">
                        {data.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                                    selectedImage === index
                                        ? "bg-blue-500 scale-125"
                                        : "bg-gray-300"
                                }`}
                            ></div>
                        ))}
                    </div>
                </div>
            )}
            <div className="xl:w-[600px]">
                <img
                    src={`${data[selectedImage]}?imwidth=600`}
                    alt="main image"
                    className="w-full h-full object-cover transition-opacity duration-500"
                />
            </div>
        </div>
    );
};

export default ImagePicker;
