<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

import AppHeader from '@/components/header/AppHeader.vue';

//TODO: Не оставляй то, что не используешь
import AppCatalog from '@/components/catalog/AppCatalog.vue';

import { useSneakersStore } from './stores';


const sneakersStore = useSneakersStore();

onMounted(() => {
    sneakersStore.fetchListSneakersItems();
});
</script>

<template>
<!--TODO: Тут лучше не нарушат семантику и все оборачивать в теги: header, footer, main (более подробно могу рассказть)-->
    <div class="main-layout m-auto min-h-screen w-5/6 rounded-3xl bg-white flex flex-col">
        <app-header />
        <router-view/>
    </div>
</template>

<style></style>
