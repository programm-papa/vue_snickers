import type IFetchData from "@/intefaces/IFetchData";
import type { FetchMethod } from "@/types/FetchMethod";

//
export default async function fetchData(method: FetchMethod, data: IFetchData) {
    let patch = import.meta.env.VITE_API_URL + data.patch;
    if (data.params !== undefined) {
        const params = data.params;
        let paramsStr = '';
        Object.keys(params).forEach((key, index) => {
            // Утановка разделения на параметры
            if (index === 0) {
                paramsStr += '?';
            } else {
                paramsStr += '&'
            }
            // Сборка строки параметров
            paramsStr += `${key}=${params[key]}`
        })
        patch += paramsStr;
    }
    return fetch(patch, {
        method: method,
        body: data.body,
    })
}