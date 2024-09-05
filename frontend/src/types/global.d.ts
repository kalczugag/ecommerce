interface ApiResponseArray<T> {
    count: number;
    data: T[];
    message?: string;
}

interface ApiResponseObject<T> {
    count: number;
    data: T;
    message?: string;
}

interface Paginate {
    sorted?: boolean;
    page?: number;
    pageSize?: number;
}
