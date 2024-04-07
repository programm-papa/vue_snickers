<script setup lang="ts">
import { useSneakersStore } from '@/stores';
import { RouterLink } from 'vue-router';

import CatalogBlockHeader from '@/components/ui/CatalogBlockHeader.vue';
import GoBackButton from '@/components/ui/GoBackButton.vue';
import ProductList from '@/components/products/ProductList.vue';
import GoBackGreenButton from '@/components/ui/GoBackGreenButton.vue';
import BlankPlug from '@/components/plug/BlankPlug.vue';

const sneakersStore = useSneakersStore();
</script>
<template>
    <catalog-block-header>
        <go-back-button />
        <div class="catalog-header__title text-4xl font-bold">Мои закладки</div>
    </catalog-block-header>
    <!-- <div class="catalog-header flex items-center gap-6 px-11 py-5">
        <div class=""></div>
        <div class="catalog-header__title text-4xl font-bold">Мои закладки</div>
    </div> -->

    <template v-if="sneakersStore.counterFavoriteItems">
        <router-link :to="'/'" />
        <product-list :productList="sneakersStore.listFavoriteItems" />
    </template>
    <template v-else>
        <blank-plug>
            <img src="/emoji-1.png" alt="emoji" class="w-20 object-cover" />
            <div class="mb-10 text-center">
                <p class="mb-3 text-2xl font-semibold">Закладок нет :(</p>
                <p class="mb-3 text-base font-normal opacity-40">
                    Вы ничего не добавляли в закладки
                </p>
            </div>
            <go-back-green-button />
        </blank-plug>
    </template>
</template>

<style scoped></style>
