// Interface for seachResult.
export interface ISeachResult<T> {
    continuationToken: string,
    data: T[]
    totalCount: number,
}