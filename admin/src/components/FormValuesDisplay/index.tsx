import ProductCard from "./ProductCard";

interface FormValuesDisplayProps {
    values: Record<string, any>;
    // add variants or custom components
}

const FormValuesDisplay = ({ values }: FormValuesDisplayProps) => {
    return <ProductCard product={values} />;
};

export default FormValuesDisplay;
