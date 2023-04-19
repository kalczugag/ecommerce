import { useDispatch, useSelector } from "react-redux";
import { changeTitle, changeDescription, changePrice } from "../store";

const PostsForm = () => {
    const dispatch = useDispatch();
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

    return (
        <div>
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
                    value={price}
                    onChange={hangePriceChange}
                    className="border"
                />
            </div>
        </div>
    );
};

export default PostsForm;
