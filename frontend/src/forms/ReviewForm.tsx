import Row from "@/components/Row";
import { Item } from "@/types/Order";
import { Rating, TextField } from "@mui/material";
import { Field } from "react-final-form";

interface ReviewFormProps {
    data: Item;
}

const ReviewForm = ({ data }: ReviewFormProps) => {
    const product = data._product;

    return (
        <div className="flex flex-col space-y-4 mt-4">
            <Field name="rating">
                {({ input }) => (
                    <Rating
                        {...input}
                        name="half-rating"
                        precision={0.5}
                        size="large"
                    />
                )}
            </Field>
            <Field name="message">
                {({ input }) => (
                    <TextField {...input} label="Message" multiline fullWidth />
                )}
            </Field>
            <Row>
                <Field name="pros">
                    {({ input }) => (
                        <TextField {...input} label="Pros" fullWidth />
                    )}
                </Field>
                <Field name="cons">
                    {({ input }) => (
                        <TextField {...input} label="Cons" fullWidth />
                    )}
                </Field>
            </Row>
        </div>
    );
};

export default ReviewForm;
