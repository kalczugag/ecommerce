interface ApiResponse<T> {
    success: boolean;
    result: T;
    message: string;
    statusCode: number;
    count?: number;
    hasMore?: boolean;
    nextCursor?: number;
}

export const successResponse = <T>(
    result: T = null as any,
    message = "OK",
    statusCode = 200,
    count?: number,
    hasMore?: boolean,
    nextCursor?: number
): ApiResponse<T> => ({
    success: true,
    result,
    message,
    statusCode,
    count,
    hasMore,
    nextCursor,
});

export const errorResponse = <T>(
    result: T = null as any,
    message: string,
    statusCode = 500
): ApiResponse<T> => ({
    success: false,
    result,
    message,
    statusCode,
});
