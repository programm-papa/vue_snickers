import { computed, ref, watch } from 'vue'
import { defineStore } from "pinia";

import type { SortTypes } from '@/types';

import fetchData from '@/utils/fetchData';

import type ISneakersItem from "@/intefaces/ISneakersItem";
import type ISneakersProduct from "@/intefaces/ISneakersProduct"

export const useSneakersStore = defineStore('useSneakersStore', () => {
    // Список кросовок
    const listSneakersItems = ref<ISneakersProduct[]>([]);
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

    // Вотчеры изменения фильтров запроса
    watch(searchQuery, () => {
        fetchListSneakersItems();
    })
    watch(sortBy, () => {
        fetchListSneakersItems();
    })

    function fetchListSneakersItems() {
        fetchData('GET', { patch: 'items/', params: fetchParams.value })
            .then((response) => response.json())
            .then((data: ISneakersItem[]) => {
                listSneakersItems.value = data.map((item) => {
                    return {
                        ...item,
                        isFavorite: false,
                        isAdded: false
                    }
                })
            }).then(() => {
                fetchListFavoriteSneakersItems();
            }).catch(error => {
                console.log(error)
            })
    }

    function fetchListFavoriteSneakersItems() {
        fetchData('GET', { patch: 'favorites/' })
            .then((response) => response.json())
            .then((data: number[]) => {
                listSneakersItems.value.forEach((item, index) => {
                    if (data.includes(index)) {
                        item.isFavorite = true;
                    }
                })
            }).catch(error => {
                console.log(error)
            })
    }
    return {
        listSneakersItems,
        sortBy,
        searchQuery,
        fetchListSneakersItems,
    }
})