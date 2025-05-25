import { enqueueSnackbar } from "notistack";

type MutationTrigger = (values: any) => Promise<any> & {
    unwrap(): Promise<any>;
};

interface UseHandleMutationProps<TValues, TResult, TError = unknown> {
    values?: TValues;
    snackbar?: boolean;
    successMessage?: string;
    errorMessage?: string;
    isAuthenticated?: boolean;
    mutation: MutationTrigger;
    localAction?: (values: TValues) => Promise<TResult>;
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
            localAction,
            isAuthenticated,
            snackbar = true,
            successMessage,
            errorMessage,
            onSuccess,
            onError,
        } = props;

        let finalSuccessMessage = successMessage;
        let finalErrorMessage = errorMessage;
        let result: any;

        try {
            if (!isAuthenticated && localAction) {
                result = await localAction(values as TValues);
            } else {
                result = await mutation(values).unwrap();
            }

            const isSuccess =
                result.success !== false &&
                (result.statusCode === undefined || result.statusCode < 400);

            if (!successMessage && !errorMessage) {
                if (isSuccess) {
                    finalSuccessMessage = result.message;
                } else {
                    finalErrorMessage = result.message || "An error occurred";
                }
            }

            if (isSuccess) {
                if (snackbar && finalSuccessMessage)
                    enqueueSnackbar(finalSuccessMessage, {
                        variant: "success",
                        autoHideDuration:
                            calculateSnackbarDuration(finalSuccessMessage),
                    });

                if (onSuccess) onSuccess(result);
            } else {
                if (snackbar && finalErrorMessage)
                    enqueueSnackbar(finalErrorMessage, {
                        variant: "error",
                        autoHideDuration:
                            calculateSnackbarDuration(finalErrorMessage),
                    });

                if (onError) onError(result as TError);

                throw new Error(finalErrorMessage || "Operation failed");
            }

            return result;
        } catch (error) {
            const errorMsg =
                finalErrorMessage ||
                (error as any)?.message ||
                "An unexpected error occurred.";

            if (snackbar) {
                enqueueSnackbar(errorMsg, {
                    variant: "error",
                    autoHideDuration: calculateSnackbarDuration(errorMsg),
                });
            }

            if (onError) onError(error as TError);
            throw error;
        }
    };

    return { handleMutation };
};
