import { computed, ref, watch } from 'vue'
import { defineStore } from "pinia";

import type { SortTypes } from '@/types';

import fetchData from '@/utils/fetchData';

import type ISneakersItem from "@/intefaces/ISneakersItem";
import type ISneakersProduct from "@/intefaces/ISneakersProduct"

export const useSneakersStore = defineStore('useSneakersStore', () => {
    // Список кросовок
    const listSneakersItems = ref<Array<ISneakersProduct>>([]);
    const listFavoriteItemsId = ref<Array<number>>([]);
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

    // Работа с бд
    // Получение списка кросовок
    const fetchListSneakersItems = () => {
        fetchData('GET', { patch: 'items/', params: fetchParams.value })
            .then((response) => response.json())
            .then((data: Array<ISneakersItem>) => {
                listSneakersItems.value = data.map((item) => {
                    return {
                        ...item,
                        isFavorite: false,
                        isAdded: false
                    }
                })
            }).then(() => {
                fetchListFavoriteSneakersItems();
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



    // Вотчер изменения товаров фаворитов
    watch(listFavoriteItemsId, (listFavorite) => {
        listSneakersItems.value.forEach((item) => {
            item.isFavorite = listFavorite.includes(item.id);
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
        listSneakersItems,
        sortBy,
        searchQuery,
        listFavoriteItemsId,
        fetchListSneakersItems,
        addItemInFavorite,
        removeItemInFavorite,
    }
})