interface ApiResponse<T> {
    count: number;
    data: T[];
    message?: string;
    error?: string;
}

interface Paginate {
    page?: number;
    pageSize?: number;
}
