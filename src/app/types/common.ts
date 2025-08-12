export type TQueryObject = {
    page?: number | string;
    limit?: number | string;
    sortBy?: string;
    sortOrder?: string;
    searchTerm?: string;
    [key: string]: any;
};
