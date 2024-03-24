<script setup lang="ts">
import ProductList from '@/components/products/ProductList.vue';


</script>

<template>
    <div class="catalog-header flex items-center justify-between px-11 py-5">
        <div class="catalog-header__title text-4xl font-bold">Все кросовки</div>
        <div class="catalog-header__search flex rounded-xl border border-gray-200 px-4 py-3">
            <img src="/search.svg" alt="" />
            <input type="text" class="border-none px-2 outline-none" placeholder="Поиск..." />
        </div>
    </div>
    <div class="catalog-list grid grid-cols-4 gap-10 px-11 py-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        <product-list />
    </div>
</template>

<style scoped></style>
