/*
В данном примере кода используется Map а не массив 
(как изначально я реализовывал данную логику, коммит b86149883b70e4a31fcf0fec628873c00671dfac)
по причинам:
1) Спецификация говорит нам: "Объект Map должен быть реализован либо с использованием хеш-таблиц, либо с
применением других механизмов, которые, в среднем, обеспечивают доступ к элементам коллекции за сублинейное время."
Однако для в реализации Map (конкретно для V8) используются детерминированные хеш-таблицы, что дает нам временную
сложность в O(1) на чтение и запись и O(n) на перехеширование.

2) Демонстрация понимания работы с Map в JS

3) Более удобный доступ к элементам по ключу (как вариант, можно было написать реализацию
с использованием объекта и работа с ним,
однако выбрана была Map именно для демонстрации понимания работы с ней)

4) Тест работы Map в Vue
*/

import { computed, ref, watch } from 'vue'
import { defineStore } from "pinia";

import type { SortTypes } from '@/types';

import fetchData from '@/utils/fetchData';

import type ISneakersItem from "@/intefaces/ISneakersItem";
import type ISneakersProduct from "@/intefaces/ISneakersProduct"

export const useSneakersStore = defineStore('useSneakersStore', () => {
    // Список кросовок
    const mapSneakersItems = ref<Map<number, ISneakersProduct>>(new Map());
    const listFavoriteItemsId = ref<Array<number>>([]);
    const listBasketAddedItemsId = ref<Array<number>>([]);
    // Сортировки товаров
    const sortBy = ref<SortTypes>('title');
    const searchQuery = ref<string>('');

    const fetchParams = computed((): Record<string, number | string> => {
        const params: Record<string, number | string> = {};
        params.sortBy = sortBy.value;
        if (searchQuery.value) {
            params.title = `*${searchQuery.value}*`;
        }
        return params;
    })

    const getListFavoriteItems = computed(() => {
        return listFavoriteItemsId.value.reduce<Array<ISneakersProduct>>(
            (result: Array<ISneakersProduct>, currentId: number): Array<ISneakersProduct> => {
                if (mapSneakersItems.value.has(currentId)) {
                    return [...result, mapSneakersItems.value.get(currentId) as ISneakersProduct];
                }
                return result
            },
            [] as Array<ISneakersProduct>)
    })

    const getListBasketAddedItems = computed(() => {
        return listBasketAddedItemsId.value.reduce<Array<ISneakersProduct>>(
            (result: Array<ISneakersProduct>, currentId: number): Array<ISneakersProduct> => {
                if (mapSneakersItems.value.has(currentId)) {
                    return [...result, mapSneakersItems.value.get(currentId) as ISneakersProduct];
                }
                return result
            },
            [] as Array<ISneakersProduct>)
    })


    const getCounterFavoriteItems = computed(() => {
        return getListFavoriteItems.value.length
    })

    const getListSneakersItems = computed(() => {
        return Array.from(mapSneakersItems.value.values());
    })

    // Работа с бд
    // Получение списка кросовок
    const fetchListSneakersItems = () => {
        fetchData('GET', { patch: 'items/', params: fetchParams.value })
            .then((response) => response.json())
            .then((data: Array<ISneakersItem>) => {
                mapSneakersItems.value = new Map(data.map((item) => {
                    return [item.id,
                    {
                        ...item,
                        isFavorite: false,
                        isAdded: false
                    }]
                }))
            }).then(() => {
                fetchListFavoriteSneakersItems();
                fetcBasketItems();
            }).catch(() => {
                fetchListSneakersItems();
            })
    }

    // Получение списка избранных
    const fetchListFavoriteSneakersItems = () => {
        fetchData('GET', { patch: 'favorites/' })
            .then((response) => response.json())
            .then((data: Array<number>) => {
                listFavoriteItemsId.value = data;
            }).catch(() => {
                fetchListFavoriteSneakersItems();
            })
    }

    // Добавление/Удаление товара в избранное
    const addItemInFavorite = (id: number): void => {
        updateFavorites(JSON.stringify([...listFavoriteItemsId.value, id]));
    }

    const removeItemInFavorite = (id: number): void => {
        updateFavorites(JSON.stringify(listFavoriteItemsId.value.filter((itemId) => itemId !== id)))
        const updatedItem: ISneakersProduct = mapSneakersItems.value.get(id) as ISneakersProduct
        updatedItem.isFavorite = false;
        mapSneakersItems.value.set(id, updatedItem);
    }

    const updateFavorites = (body: string) => {
        fetchData('PATCH', { patch: 'favorites/', body })
            .then((response) => response.json())
            .then((data: number[]) => {
                listFavoriteItemsId.value = data;
            }).catch(() => {
                updateFavorites(body)
            })
    }

    // Получение товаров корзины
    const fetcBasketItems = () => {
        fetchData('GET', { patch: 'basket/' })
            .then((response) => response.json())
            .then((data: Array<number>) => {
                listBasketAddedItemsId.value = data;
            }).catch(() => {
                fetcBasketItems();
            })
    }

    // Добавление товара в корзину
    const addItemInBasket = (id: number): void => {
        updateBasket(JSON.stringify([...listBasketAddedItemsId.value, id]));
    }

    const removeItemInBasket = (id: number): void => {
        updateBasket(JSON.stringify(listBasketAddedItemsId.value.filter((itemId) => itemId !== id)))
        const updatedItem: ISneakersProduct = mapSneakersItems.value.get(id) as ISneakersProduct
        updatedItem.isAdded = false;
        mapSneakersItems.value.set(id, updatedItem);
    }

    const updateBasket = (body: string) => {
        fetchData('PATCH', { patch: 'basket/', body })
            .then((response) => response.json())
            .then((data: number[]) => {
                listBasketAddedItemsId.value = data;
            }).catch(() => {
                updateFavorites(body)
            })
    }

    // // Вотчер изменения товаров фаворитов
    watch(listFavoriteItemsId, (listFavorite) => {
        listFavorite.forEach((favoriteItemId) => {
            if (mapSneakersItems.value.has(favoriteItemId)) {
                const updatedSneakersProduct: ISneakersProduct = mapSneakersItems.value.get(favoriteItemId) as ISneakersProduct;
                updatedSneakersProduct.isFavorite = true;
                mapSneakersItems.value.set(favoriteItemId, updatedSneakersProduct)
            }
        })
    })
    // Вотчер изменения товаров корзины
    watch(listBasketAddedItemsId, (listBasket) => {
        listBasket.forEach((basketItemId) => {
            if (mapSneakersItems.value.has(basketItemId)) {
                const updatedSneakersProduct: ISneakersProduct = mapSneakersItems.value.get(basketItemId) as ISneakersProduct;
                updatedSneakersProduct.isAdded = true;
                mapSneakersItems.value.set(basketItemId, updatedSneakersProduct)
            }
        })
    })
    // Вотчеры изменения фильтров запроса
    watch(searchQuery, () => {
        fetchListSneakersItems();
    })
    watch(sortBy, () => {
        fetchListSneakersItems();
    })

    return {
        getListSneakersItems,
        getListFavoriteItems,
        getCounterFavoriteItems,
        getListBasketAddedItems,
        // Фильтры
        sortBy,
        searchQuery,
        // Методы
        fetchListSneakersItems,
        addItemInFavorite,
        removeItemInFavorite,
        addItemInBasket,
        removeItemInBasket,
        fetcBasketItems,
    }
})