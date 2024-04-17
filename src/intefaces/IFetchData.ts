export default interface IFetchData {
    patch: string,
    params?: {
        // TODO: я бы через дженерик сделал  [key: string]: Т
        // Q?: Не совсем понимаю, как тут такое сделать? Просто я же должен ограничить типы параметра, но как тут использовать дженерик, понять не могу.
        [key: string]: string | number | boolean;
    },
    body?: string, // JSON string
}
