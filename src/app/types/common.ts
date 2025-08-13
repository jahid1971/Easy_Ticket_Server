export type TQueryObject = {
    page?: number | string;
    limit?: number | string;
    sortBy?: string;
    sortOrder?: string;
    searchTerm?: string;
    [key: string]: unknown;
};

// Generic error response shape used by error handlers
export interface IErrorIssue {
    path: string;
    message: string;
    code?: any;
    expected?: any;
    received?: any;
}

export interface IGenericErrorResponse {
    statusCode: number;
    error: string;
    message: string;
    errorDetails?: any;
}
