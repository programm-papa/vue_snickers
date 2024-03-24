<script setup lang="ts">
import { useSneakersStore } from '@/stores';
const sneakersStore = useSneakersStore();

import ProductCard from '@/components/products/ProductCard.vue';
</script>

<template>
    <product-card
        v-for="sneakersProduct in sneakersStore.listSneakersItems"
        :key="sneakersProduct.id"
        :itemData="sneakersProduct"
    />
</template>

<style scoped></style>
