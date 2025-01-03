interface ApiResponseArray<T> {
    count: number;
    data: T[];
    message?: string;
    error?: string;
}

interface ApiResponseObject<T> {
    count: number;
    data: T;
    message?: string;
    error?: string;
}

interface Paginate {
    category?: string;
    sorted?: boolean;
    skip?: number;
    limit?: number;
    sort?: string;
    status?: string;
    filter?: Record<string, any> | string;
    populate?: string;
}
