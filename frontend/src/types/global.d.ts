interface ApiResponseArray<T> {
    success: boolean;
    result: T[];
    message: string;
    count?: number;
    hasMore?: boolean;
    nextCursor?: number;
}

interface ApiResponseObject<T> {
    success: boolean;
    result: T;
    message: string;
    count?: number;
    hasMore?: boolean;
    nextCursor?: number;
}

interface Paginate {
    category?: string;
    favorite?: boolean;
    sorted?: boolean;
    skip?: number;
    limit?: number;
    sort?: string;
    status?: string;
    filter?: Record<string, any> | string;
    populate?: string;
}
