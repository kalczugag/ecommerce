interface FeaturedProps {
    imageUrl: string;
    title: string;
    description: string;
}

const Featured = ({ imageUrl, title, description }: FeaturedProps) => {
    return (
        <div className="flex flex-col space-y-2 md:space-x-2 md:space-y-0 md:flex-row">
            <img
                src={imageUrl}
                alt="featured product"
                className="w-96 h-96 object-contain"
            />
            <div className="flex flex-col space-y-4 px-2 max-w-96">
                <h1 className="text-3xl font-bold">{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Featured;
