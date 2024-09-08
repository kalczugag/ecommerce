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
    named?: boolean;
    page?: number;
    pageSize?: number;
}
