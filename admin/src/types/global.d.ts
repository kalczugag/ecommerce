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
    sort?: Record<string, any>;
    named?: boolean;
    filter?: Record<string, any>;
    skip?: number;
    limit?: number;
    roleName?: string;
}
