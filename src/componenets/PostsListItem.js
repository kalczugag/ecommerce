import { useState } from "react";
import { useThunk } from "../hooks/use-thunk";
import { removePost } from "../store";
import { GoTrashcan, GoGear } from "react-icons/go";
import Button from "./Button";
import PostEditForm from "./PostEditForm";

const PostsListItem = ({ post }) => {
    const [doRemovePost, removeLoading, removeError] = useThunk(removePost);
    const [showEdit, setShowEdit] = useState(false);

    const handleRemovePost = () => {
        doRemovePost(post);
    };

    const handleShowEdit = () => {
        setShowEdit(!showEdit);
    };

    const MAX_DESCRIPTION_LENGTH = 100;

    const truncatedDescription =
        post.description.length > MAX_DESCRIPTION_LENGTH
            ? post.description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
            : post.description;

    return (
        <div>
            {showEdit || (
                <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-auto bg-gray-300">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4 flex-grow">
                        <h3 className="text-lg font-semibold mb-2">
                            {post.title}
                        </h3>
                        <p
                            className="text-gray-600 mb-4"
                            title={post.description}
                        >
                            {truncatedDescription}
                        </p>
                        <div className="flex items-center justify-between">
                            <div className="text-gray-700 font-bold">
                                ${post.price}
                            </div>
                            <div className="flex flex-row space-x-2">
                                <Button
                                    onClick={handleShowEdit}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <GoGear />
                                </Button>
                                {(
                                    <Button
                                        loading={removeLoading}
                                        onClick={handleRemovePost}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <GoTrashcan />
                                    </Button>
                                ) || removeError}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showEdit && <PostEditForm onSubmit={handleShowEdit} post={post} />}
        </div>
    );
};

export default PostsListItem;
