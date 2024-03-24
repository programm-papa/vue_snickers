<script setup lang="ts">
import { ref, watch } from 'vue';
import type { SortTypes } from '@/types';

import { useSneakersStore } from '@/stores';

import ProductList from '@/components/products/ProductList.vue';
import AppInput from '@/components/ui/AppInput.vue';
import AppSelect from '@/components/ui/AppSelect.vue';

const sneakersStore = useSneakersStore();

const listSortTypes = ref<Record<SortTypes, string>>({ price: 'по цене', title: 'по названию' });
</script>

<template>
    <div class="catalog-header flex items-center gap-6 px-11 py-5">
        <div class="catalog-header__title text-4xl font-bold">Все кросовки</div>
        <app-select
            v-model:selected="sneakersStore.sortBy"
            :listOptions="listSortTypes"
            class="catalog-header__search ml-auto"
        />
        <app-input
            @searchInput="(searchValue) => (sneakersStore.searchQuery = searchValue)"
            class="catalog-header__search"
        />
    </div>
    <div
        class="catalog-list grid grid-cols-4 gap-10 px-11 py-3 max-lg:grid-cols-2 max-sm:grid-cols-1"
    >
        <product-list />
    </div>
</template>

<style scoped></style>
