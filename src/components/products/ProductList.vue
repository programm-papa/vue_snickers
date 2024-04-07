<script setup lang="ts">
import ProductCard from '@/components/products/ProductCard.vue';
import type IProductList from '@/intefaces/IProductListProps';

defineProps<IProductList>();
</script>

<template>
    <div
        class="catalog-list grid grid-cols-4 gap-10 px-11 py-3 max-lg:grid-cols-2 max-sm:grid-cols-1"
    >
        <product-card
            v-for="sneakersProduct in productList"
            :key="sneakersProduct.id"
            :itemData="sneakersProduct"
        />
    </div>
</template>

<style scoped></style>
