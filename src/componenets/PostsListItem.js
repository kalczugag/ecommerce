const PostsListItem = ({ post }) => {
    return (
        <div className="flex flex-col">
            <div>{post.title}</div>
            <div>{post.description}</div>
            <div>{post.price}</div>
        </div>
    );
};

export default PostsListItem;
