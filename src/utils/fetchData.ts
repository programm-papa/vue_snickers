import type IFetchData from "@/intefaces/IFetchData";
import type { FetchMethod } from "@/types";

// TODO: я бы разделял код отступами, чтобы лучше читалось
// TODO: типизируй, что возвращается функция (и вообще по максимуму типизируй)
// TODO: советую использовать JSDoc / TSDoc для того чтобы кратко описывать утилиты/классы/сторы и сложные участки кода
// TODO: в целом этот метод бы я переписал, попробовал бы более универсаальным сделать + параметры по другому добавлял бы 
// Q?: Интересен другой вариант реалищации метода
export default async function fetchData(method: FetchMethod, data: IFetchData): Promise<Response> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
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
        headers: myHeaders,
        method: method,
        body: data.body,
    })
}
