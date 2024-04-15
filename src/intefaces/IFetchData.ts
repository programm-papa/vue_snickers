export default interface IFetchData {
    patch: string,
    params?: {
        // TODO: я бы через дженерик сделал  [key: string]: Т
        [key: string]: string | number;
    },
    body?: string, // JSON string
}
