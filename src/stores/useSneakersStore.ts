import { ref } from 'vue'
import { defineStore } from "pinia";

import fetchData from '@/utils/fetchData';

import type ISneakersItem from "@/intefaces/ISneakersItem";
import type ISneakersProduct from "@/intefaces/ISneakersProduct"

export const useSneakersStore = defineStore('useSneakersStore', () => {
    const listSneakersItems = ref<ISneakersProduct[]>([])

    function fetchListSneakersItems() {
        fetchData('GET', { patch: 'items/' })
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
        fetchListSneakersItems,
    }
})