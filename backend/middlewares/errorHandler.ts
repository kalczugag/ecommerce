import express from "express";

interface ResponseProps {
    success: boolean;
    message: string;
    stack?: string;
}

export const errorHandler = (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const statusCode = error.statusCode || 500;

    const response: ResponseProps = {
        success: false,
        message: error.message,
    };

    if (process.env.NODE_ENV === "development") {
        response.stack = error.stack;
    }

    res.status(statusCode).json(response);
};
