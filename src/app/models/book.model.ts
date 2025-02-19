export type Status = "reading" | "read" | "unread" | "delete";

export type Book ={
    id: number,
    title: string,
    author: string,
    status: Status,
    dateStatus: Date,
    upStatus: Status
}
