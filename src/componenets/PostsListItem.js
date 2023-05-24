import { useState } from "react";
import { useDispatch } from "react-redux";
import { useThunk } from "../hooks/use-thunk";
import useDevState from "../hooks/use-dev-state";
import { removePost, editPost, addToCart } from "../store";
import { GoTrashcan, GoGear } from "react-icons/go";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Button from "./Button";
import PostEditForm from "./PostEditForm";

const PostsListItem = ({ post }) => {
    const dispatch = useDispatch();
    const [showEdit, setShowEdit] = useState(false);
    const [doRemovePost, removeLoading, removeError] = useThunk(removePost);
    const [doEditPost] = useThunk(editPost);
    const isDev = useDevState();

    const handleRemovePost = () => {
        doRemovePost(post);
    };

    const handleShowEdit = () => {
        setShowEdit(!showEdit);
    };

    const handleAddToCart = () => {
        dispatch(addToCart({ ...post, count: 1 }));
    };

    const handleAddToWishlist = () => {
        doEditPost({ ...post, wishlist: !post.wishlist });
    };

    const MAX_DESCRIPTION_LENGTH = 100;

    const truncatedDescription =
        post.description.length > MAX_DESCRIPTION_LENGTH
            ? post.description.substring(0, MAX_DESCRIPTION_LENGTH) + "..."
            : post.description;

    return (
        <div>
            {showEdit || (
                <div className="relative flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="absolute top-3 right-0 flex items-center justify-center h-10 w-10 bg-white">
                        <Button
                            className="border-0 text-3xl"
                            onClick={handleAddToWishlist}
                        >
                            {post.wishlist ? (
                                <AiFillHeart className="text-orange-400" />
                            ) : (
                                <AiOutlineHeart />
                            )}
                        </Button>
                    </div>
                    <a
                        href={`/product/${post.title.toLowerCase()}`}
                        alt={post.title}
                        className="h-auto bg-gray-300"
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </a>
                    <div className="p-4 flex-grow">
                        <a
                            href={`/product/${post.title.toLowerCase()}`}
                            alt={post.title}
                        >
                            <h3 className="text-lg font-semibold mb-2">
                                {post.title}
                            </h3>
                        </a>

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
                            {isDev || (
                                <div className="flex justify-end">
                                    <Button
                                        primary
                                        onClick={handleAddToCart}
                                        className="hover:opacity-90"
                                    >
                                        Add To Cart
                                    </Button>
                                </div>
                            )}
                            {isDev && (
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
                            )}
                        </div>
                    </div>
                </div>
            )}
            {showEdit && <PostEditForm onSubmit={handleShowEdit} post={post} />}
        </div>
    );
};

export default PostsListItem;
