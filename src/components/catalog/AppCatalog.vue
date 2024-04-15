<script setup lang="ts">
//TODO: Не оставляй то, что не используешь
import { ref, watch } from 'vue';
import type { SortTypes } from '@/types';

import { useSneakersStore } from '@/stores';

import CatalogBlockHeader from '@/components/ui/CatalogBlockHeader.vue';
import ProductList from '@/components/products/ProductList.vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppSelect from '@/components/ui/AppSelect.vue';

const sneakersStore = useSneakersStore();

const listSortTypes = ref<Record<SortTypes, string>>({ price: 'по цене', title: 'по названию' });
</script>

<template>
    <catalog-block-header>
        <!--TODO: 1) текст в div как-то странно, лучше в р 2) я бы сделал UI компонент для текста-->
       <div class="catalog-header__title text-4xl font-bold">Все кросовки</div>
       <app-select
           v-model:selected="sneakersStore.sortBy"
           :listOptions="listSortTypes"
           class="catalog-header__search ml-auto"
       />
       <!--TODO: @searchInput="(searchValue) => (sneakersStore.searchQuery = searchValue)" - лучше вынести в метод, чтобы логика была в скрипте + типизировать аргумент-->
        <app-input
            @searchInput="(searchValue) => (sneakersStore.searchQuery = searchValue)"
            class="catalog-header__search"
        />
    </catalog-block-header>
    <product-list :productList="sneakersStore.getListSneakersItems" />
</template>

<style scoped></style>
