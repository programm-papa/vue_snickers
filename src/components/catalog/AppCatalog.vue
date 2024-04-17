<script setup lang="ts">
import { ref } from 'vue';
import type { SortTypes } from '@/types';

import { useSneakersStore } from '@/stores';

import CatalogBlockHeader from '@/components/ui/CatalogBlockHeader.vue';
import UiH2ContentTitle from '@/components/ui/UiH2ContentTitle.vue';
import ProductList from '@/components/products/ProductList.vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppSelect from '@/components/ui/AppSelect.vue';

const sneakersStore = useSneakersStore();

const listSortTypes = ref<Record<SortTypes, string>>({ price: 'по цене', title: 'по названию' });
const updateSearchValue = (searchValue: string): void => {
    sneakersStore.searchQuery = searchValue;
};
</script>

<template>
    <catalog-block-header>
        <ui-h2-content-title>Все кросовки</ui-h2-content-title>
        <app-select
            v-model:selected="sneakersStore.sortBy"
            :listOptions="listSortTypes"
            class="catalog-header__search ml-auto"
        />
        <app-input @searchInput="updateSearchValue" class="catalog-header__search" />
    </catalog-block-header>
    <product-list :productList="sneakersStore.getListSneakersItems" />
</template>

<style scoped></style>
