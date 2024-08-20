export interface ImageProps {
    src: string;
    alt: string;
    size?: "sm" | "md" | "xl";
    variant?: "rounded" | "square";
}

const Image = ({ src, alt, size = "md", variant = "rounded" }: ImageProps) => {
    const sizeMap =
        size === "sm" ? "w-12 h-12" : size === "md" ? "w-14 h-14" : "w-24 h-24";

    const variantMap = variant === "rounded" ? "rounded-full" : "rounded-none";

    return (
        <div className={sizeMap}>
            <img
                className={`w-full h-full ${variantMap} object-top object-cover`}
                src={src}
                alt={alt}
            />
        </div>
    );
};

export default Image;
