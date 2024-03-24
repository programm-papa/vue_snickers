export default interface IFetchData {
    patch: string,
    params?: {
        [key: string]: string | number;
    },
    body?: string, // JSON string
}