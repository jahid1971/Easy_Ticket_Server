
import { ZodError } from "zod";
import { IErrorIssue, IGenericErrorResponse } from "../types/common";

const handlerZodError = (err: ZodError): IGenericErrorResponse => {
    console.log(err, "err in zod error handle ---------------");
    const errorIssues: IErrorIssue[] = err.issues.map((issue) => {
       
        const pathSegment = issue?.path?.[0] ? String(issue.path[0]) : "";
        const message = issue?.message === "Required" ? `${pathSegment} is required` : issue?.message;

        return {
            path: issue.path[issue.path.length - 1]?.toString() || "",
            message,
            code: issue.code,
            expected: "expected" in issue ? (issue as any).expected : undefined,
            received: "received" in issue ? (issue as any).received : undefined,
        };
    });

    return {
        statusCode: 400,
        error: "Zod Validation Error",
        message: errorIssues.map((value: any) => value.message).join(",  "),
        errorDetails: {
            name: err.name,
            issues: errorIssues,
        },
    };
};

export default handlerZodError;
