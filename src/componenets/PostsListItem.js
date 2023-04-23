import { GoTrashcan } from "react-icons/go";

const PostsListItem = ({ post }) => {
    return (
        <div className="flex flex-col w-64 h-72 bg-gray-200">
            <div>{post.title}</div>
            <div>{post.description}</div>
            <div>{post.price}</div>
        </div>
    );
};

export default PostsListItem;
