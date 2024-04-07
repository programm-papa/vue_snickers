<script setup lang="ts">
import { useSneakersStore } from '@/stores';

import type ISneakersProduct from '@/intefaces/ISneakersProduct';

const sneakersStore = useSneakersStore();
const { itemData } = defineProps<{ itemData: ISneakersProduct }>();
</script>

<template>
    <div
        class="product-card relative flex flex-col items-center justify-center gap-3 rounded-3xl border border-gray-200 bg-white px-6 py-5 transition hover:-translate-y-2 hover:shadow-xl"
    >
        <img
            class="product-card__like absolute left-5 top-5 cursor-pointer rounded-lg hover:shadow-md"
            :src="itemData.isFavorite ? '/like-2.svg' : '/like-1.svg'"
            @click="
                itemData.isFavorite
                    ? sneakersStore.removeItemInFavorite(itemData.id)
                    : sneakersStore.addItemInFavorite(itemData.id)
            "
        />
        <img class="product-card__img max-h-28" :src="itemData.imageUrl" :alt="itemData.title" />
        <p class="product-card__name text-sm font-normal">
            {{ itemData.title }}
        </p>
        <div class="product-card__footer flex w-full items-center justify-between">
            <div class="product-card__price-container">
                <p class="text-xs uppercase text-gray-400">Цена:</p>
                <p class="text-sm font-bold">{{ itemData.price }} руб</p>
            </div>
            <img
                class="product-card__add-to-cart cursor-pointer rounded-lg hover:shadow-md"
                :src="`/${itemData.isAdded ? 'checked.svg' : 'plus.svg'}`"
            />
        </div>
    </div>
</template>

<style scoped></style>
