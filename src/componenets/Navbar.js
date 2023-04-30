import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../componenets/Button";
import Modal from "../componenets/Modal";
import PostsAddForm from "./PostsAddForm";
import PostSearch from "./PostsSearch";
import Cart from "./Cart";
import { GoHome, GoPlus } from "react-icons/go";

const Navbar = ({ isDev }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(!showModal);
    };

    const modal = (
        <Modal onClose={handleShowModal} container=".modal-container">
            <PostsAddForm onSubmit={handleShowModal} />
        </Modal>
    );

    return (
        <nav className="fixed top-0 left-0 right-0 h-11 bg-gray-800">
            <div className="h-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex-shrink-0">
                    <Link
                        to="/"
                        className="text-white font-bold text-2xl py-2 rounded-md"
                    >
                        <GoHome />
                    </Link>
                </div>
                <div className="hidden md:block">
                    <div className="relative ml-10 flex space-x-4">
                        {isDev && (
                            <Link
                                to="/admin"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Admin
                            </Link>
                        )}
                        {isDev && (
                            <Button
                                primary
                                onClick={handleShowModal}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded"
                            >
                                <GoPlus />
                            </Button>
                        )}
                        {isDev || (
                            <div className="flex">
                                <PostSearch />
                                <Cart />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showModal && modal}
        </nav>
    );
};

export default Navbar;
