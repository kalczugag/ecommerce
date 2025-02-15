import { enqueueSnackbar } from "notistack";

type MutationTrigger = (values: any) => Promise<any> & {
    unwrap(): Promise<any>;
};

interface UseHandleMutationProps<TValues, TResult, TError = unknown> {
    values: TValues;
    snackbar?: boolean;
    successMessage?: string;
    errorMessage?: string;
    mutation: MutationTrigger;
    onSuccess?: (result: TResult) => void;
    onError?: (error: TError) => void;
}

export const useHandleMutation = () => {
    const handleMutation = async <TValues, TResult, TError>(
        props: UseHandleMutationProps<TValues, TResult, TError>
    ) => {
        const {
            values,
            mutation,
            snackbar = true,
            successMessage,
            errorMessage,
            onSuccess,
            onError,
        } = props;

        try {
            const result = await mutation(values).unwrap();

            if (snackbar && successMessage)
                enqueueSnackbar(props.successMessage, { variant: "success" });

            if (onSuccess) onSuccess(result);
        } catch (error) {
            if (snackbar && errorMessage)
                enqueueSnackbar(props.errorMessage, { variant: "error" });

            if (onError) onError(error as TError);
            throw error;
        }
    };

    return { handleMutation };
};
