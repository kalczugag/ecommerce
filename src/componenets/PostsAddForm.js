import { useDispatch, useSelector } from "react-redux";
import {
    changeTitle,
    changeDescription,
    changePrice,
    changeImage,
    addPost,
} from "../store";
import Button from "./Button";
import { useThunk } from "../hooks/use-thunk";

const PostsAddForm = ({ onSubmit }) => {
    const dispatch = useDispatch();
    const [doCreatePost, isLoading, error] = useThunk(addPost);
    const { title, description, price, image } = useSelector((state) => {
        return {
            title: state.postAddForm.title,
            description: state.postAddForm.description,
            price: state.postAddForm.price,
            image: state.postAddForm.image,
        };
    });

    const handleTitleChange = (event) => {
        dispatch(changeTitle(event.target.value));
    };

    const handleDescriptionChange = (event) => {
        dispatch(changeDescription(event.target.value));
    };

    const handlePriceChange = (event) => {
        dispatch(changePrice(parseInt(event.target.value)) || 0);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const imageUrl = reader.result;
            dispatch(changeImage(imageUrl));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit();

        doCreatePost({ title, description, price, image });
    };

    return (
        <form onSubmit={handleSubmit}>
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
                    loading={isLoading}
                    type="submit"
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Add Post
                </Button>
            ) || error}
        </form>
    );
};

export default PostsAddForm;
