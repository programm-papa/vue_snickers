<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

import AppHeader from '@/components/header/AppHeader.vue';

import { useSneakersStore } from './stores';
const sneakersStore = useSneakersStore();

onMounted(() => {
    sneakersStore.fetchListSneakersItems();
});
</script>

<template>
    <!--TODO: Тут лучше не нарушат семантику и все оборачивать в теги: header, footer, main (более подробно могу рассказть)-->
    <!--Q?: Ты не мог бы подсказать, как тут лучше сделать, просто у меня примерно такая логика: компонент шапки содержит тек header, а вот контент я обернул уже тут в main, тк нет гарантии, что там будет именно main тег как основной-->
    <div class="main-layout m-auto flex min-h-screen w-5/6 flex-col rounded-3xl bg-white">
        <app-header />
        <main>
            <router-view />
        </main>
    </div>
</template>

<style></style>
