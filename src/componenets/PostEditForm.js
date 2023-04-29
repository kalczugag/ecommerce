import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useThunk } from "../hooks/use-thunk";
import {
    changeEditTitle,
    changeEditDescription,
    changeEditPrice,
    changeEditImage,
    editPost,
} from "../store";
import { GoX } from "react-icons/go";
import Button from "./Button";

const PostsAddForm = ({ onSubmit, post }) => {
    const dispatch = useDispatch();
    const [doEditPost, editLoading, editError] = useThunk(editPost);
    const { title, description, price, image } = useSelector((state) => {
        return {
            title: state.postEditForm.title,
            description: state.postEditForm.description,
            price: state.postEditForm.price,
            image: state.postEditForm.image,
        };
    });

    useEffect(() => {
        dispatch(changeEditTitle(post.title));
        dispatch(changeEditDescription(post.description));
        dispatch(changeEditPrice(post.price));
        dispatch(changeEditImage(post.image));
    }, [dispatch, post.title, post.description, post.price, post.image]);

    const handleTitleChange = (event) => {
        dispatch(changeEditTitle(event.target.value));
    };

    const handleDescriptionChange = (event) => {
        dispatch(changeEditDescription(event.target.value));
    };

    const handlePriceChange = (event) => {
        dispatch(changeEditPrice(parseInt(event.target.value)) || 0);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const imageUrl = reader.result;
            dispatch(changeEditImage(imageUrl));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit();

        doEditPost({ title, description, price, image, id: post.id });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-end items-center">
                <Button onClick={onSubmit} className="border-0">
                    <GoX className="text-xl" />
                </Button>
            </div>
            <div className="flex flex-col">
                <label className="text-sm font-semibold mb-1 text-gray-600">
                    Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className="py-2 px-3 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm font-semibold mb-1 text-gray-600">
                    Description
                </label>
                <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    className="py-2 px-3 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500 h-24 resize-none"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm font-semibold mb-1 text-gray-600">
                    Price
                </label>
                <input
                    type="number"
                    value={price || ""}
                    onChange={handlePriceChange}
                    className="py-2 px-3 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-sm font-semibold mb-1 text-gray-600">
                    Image
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            {(
                <Button
                    loading={editLoading}
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Edit Post
                </Button>
            ) || editError}
        </form>
    );
};

export default PostsAddForm;
