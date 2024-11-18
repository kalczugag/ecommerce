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
    sort?: Record<string, any>;
    filter?: Record<string, any> | string;
    skip?: number;
    limit?: number;
    roleName?: string;
    searchTerm?: string;
}

interface SelectItemProps {
    label: string;
    value: string | Record<string, any>;
}

interface SortConfigProps {
    label: string;
    criteria: string; //for filter use choosen object key, for sort just 'sort'
    items: SelectItemProps[];
}
