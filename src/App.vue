<script setup lang="ts">
import { onMounted } from 'vue';

import AppHeader from '@/components/header/AppHeader.vue';
import AppCatalog from '@/components/catalog/AppCatalog.vue';

import { useSneakersStore } from './stores';

const sneakersStore = useSneakersStore();

onMounted(() => {
    sneakersStore.fetchListSneakersItems();
});
</script>

<template>
    <div class="main-layout m-auto min-h-screen w-5/6 rounded-3xl bg-white">
        <app-header />
        <app-catalog />
    </div>
</template>

<style></style>
