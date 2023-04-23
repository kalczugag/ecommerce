import { GoTrashcan } from "react-icons/go";
import { useThunk } from "../hooks/use-thunk";
import { removePost } from "../store";
import Button from "./Button";

const PostsListItem = ({ post }) => {
    const [doRemovePost, isLoading, error] = useThunk(removePost);

    const handleRemovePost = () => {
        doRemovePost(post);
    };

    return (
        <div className="flex flex-col w-64 h-96 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-300">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.description}</p>
                <div className="flex items-center justify-between">
                    <div className="text-gray-700 font-bold">${post.price}</div>
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
        </div>
    );
};

export default PostsListItem;
