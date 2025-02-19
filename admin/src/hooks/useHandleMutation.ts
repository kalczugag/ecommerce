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
    const calculateSnackbarDuration = (message: string): number => {
        const baseDuration = 2000;
        const extraPerCharacter = 50;
        const maxDuration = 10000;

        return Math.min(
            baseDuration + message.length * extraPerCharacter,
            maxDuration
        );
    };

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

        let finalSuccessMessage = successMessage;
        let finalErrorMessage = errorMessage;

        try {
            const result = await mutation(values).unwrap();

            if (!successMessage && !errorMessage) {
                if (result.statusCode < 400) {
                    finalSuccessMessage = result.message;
                } else {
                    finalErrorMessage = result.message || "An error occurred";
                }
            }

            if (snackbar && finalSuccessMessage)
                enqueueSnackbar(finalSuccessMessage, {
                    variant: "success",
                    autoHideDuration:
                        calculateSnackbarDuration(finalSuccessMessage),
                });

            if (onSuccess) onSuccess(result);
        } catch (error) {
            if (snackbar && finalErrorMessage)
                enqueueSnackbar(finalErrorMessage, {
                    variant: "error",
                    autoHideDuration:
                        calculateSnackbarDuration(finalErrorMessage),
                });

            if (onError) onError(error as TError);
            throw error;
        }
    };

    return { handleMutation };
};
