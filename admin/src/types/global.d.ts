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
    sorted?: boolean;
    named?: boolean;
    sort?: Record<string, any>;
    filter?: Record<string, any> | string;
    skip?: number;
    limit?: number;
    roleName?: string;
    populate?: string;
    select?: string;
    search?: string;
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
