export interface IResponse<T> {
  pageNumber: number,
  pageSize: number,
  data: T,
  totalNumberOfRecords: number,
  totalNumberOfPages: number
}
