import { useState, useCallback } from "react";

interface UseMutationHandlerOptions<TData, TError = any> {
    onSuccess?: () => void;
    onError?: (error: TError) => void;
}

export const useMutationHandler = <TData>(
    mutationTrigger: (args: TData) => Promise<any>,
    { onSuccess, onError }: UseMutationHandlerOptions<TData> = {}
) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleMutation = useCallback(
        async (args: TData) => {
            setIsLoading(true);
            setErrorMessage(null);
            try {
                await mutationTrigger(args);
                if (onSuccess) {
                    onSuccess();
                }
            } catch (err: any) {
                if (err && typeof err === "object" && "data" in err) {
                    setErrorMessage(
                        err.data.error || "An unexpected error occurred."
                    );
                } else {
                    setErrorMessage("An unexpected error occurred.");
                }
                if (onError) {
                    onError(err);
                }
            } finally {
                setIsLoading(false);
            }
        },
        [mutationTrigger, onSuccess, onError]
    );

    return {
        handleMutation,
        isLoading,
        errorMessage,
    };
};
