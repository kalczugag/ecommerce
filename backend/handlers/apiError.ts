export const createApiError = (message: string, statusCode = 500) => {
    const error: any = new Error(message);
    error.statusCode = statusCode;

    error.isOperational = true;
    return error;
};
