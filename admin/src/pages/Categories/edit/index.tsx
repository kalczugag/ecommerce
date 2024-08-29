import { useParams } from "react-router-dom";

const CategoriesEdit = () => {
    const { id } = useParams();

    return (
        <div>edit - {id}</div>
        // <CrudModule actionForm={<UpdateForm />} />
    );
};

export default CategoriesEdit;
