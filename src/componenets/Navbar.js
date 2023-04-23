import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../componenets/Button";
import Modal from "../componenets/Modal";
import PostsForm from "../componenets/PostsForm";

const Navbar = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    const modal = (
        <Modal onClose={handleShowModal} container=".modal-container">
            <PostsForm onSubmit={handleShowModal} />
        </Modal>
    );

    return (
        <nav className="fixed top-0 left-0 right-0 bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex-shrink-0">
                    <Link to="/" className="text-white font-bold text-xl">
                        Home
                    </Link>
                </div>
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                        <Link
                            to="/admin"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Admin
                        </Link>
                        <Button
                            primary
                            onClick={handleShowModal}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Add Post
                        </Button>
                    </div>
                </div>
            </div>
            {showModal && modal}
        </nav>
    );
};

export default Navbar;
