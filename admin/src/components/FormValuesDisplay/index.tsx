import ProductCard from "./ProductCard";

interface FormValuesDisplayProps {
    values: Record<string, any>;
}

const FormValuesDisplay = ({ values }: FormValuesDisplayProps) => {
    return <ProductCard product={values} />;
};

export default FormValuesDisplay;
