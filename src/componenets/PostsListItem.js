import { GoTrashcan } from "react-icons/go";
import { useThunk } from "../hooks/use-thunk";
import { removePost } from "../store";
import Button from "./Button";
import { Link } from "react-router-dom";

const PostsListItem = ({ post }) => {
    const [doRemovePost, isLoading, error] = useThunk(removePost);
    const { title, description, price } = post;

    const handleRemovePost = () => {
        doRemovePost(post);
    };

    const MAX_DESCRIPTION_LENGTH = 100;

    const truncatedDescription =
        post.description.length > MAX_DESCRIPTION_LENGTH
            ? post.description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
            : post.description;

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
            <Link
                to={{
                    pathname: "/item",
                    state: { title, description, price },
                }}
            >
                <div className="h-auto bg-gray-300">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-4 flex-grow">
                    <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4" title={post.description}>
                        {truncatedDescription}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="text-gray-700 font-bold">
                            ${post.price}
                        </div>
                        {(
                            <Button
                                loading={isLoading}
                                onClick={handleRemovePost}
                                className="text-red-600 hover:text-red-700"
                            >
                                <GoTrashcan />
                            </Button>
                        ) || error}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PostsListItem;
