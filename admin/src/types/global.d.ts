interface ApiResponse<T> {
    count: number;
    data: T[];
    message?: string;
}

interface Paginate {
    page?: number;
    pageSize?: number;
}
