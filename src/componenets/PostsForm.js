import { useDispatch, useSelector } from "react-redux";
import { changeTitle, changeDescription, changePrice, addPost } from "../store";
import Button from "./Button";
import { useThunk } from "../hooks/use-thunk";

const PostsForm = ({ onSubmit }) => {
    const dispatch = useDispatch();
    const [doCreatePost, isLoading, error] = useThunk(addPost);
    const { title, description, price } = useSelector((state) => {
        return {
            title: state.postForm.title,
            description: state.postForm.description,
            price: state.postForm.price,
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

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit();

        doCreatePost({ title, description, price });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className="border"
                />
            </div>
            <div className="flex flex-col mb-2">
                <label>Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={handleDescriptionChange}
                    className="border"
                />
            </div>
            <div className="flex flex-col mb-2">
                <label>Price</label>
                <input
                    type="number"
                    value={price || ""}
                    onChange={handlePriceChange}
                    className="border"
                />
            </div>
            {(
                <Button loading={isLoading} type="submit">
                    Add Post
                </Button>
            ) || error}
        </form>
    );
};

export default PostsForm;
