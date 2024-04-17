<script setup lang="ts">
import HeaderLogo from '@/components/header/HeaderLogo.vue';
import HeaderNav from '@/components/header/HeaderNav.vue';
</script>

<template>
    <header
        class="header sticky top-0 flex items-center justify-between border-b z-50 border-gray-200 bg-white px-11 py-11"
    >
        <HeaderLogo />
        <HeaderNav />
    </header>
</template>

<style scoped></style>
