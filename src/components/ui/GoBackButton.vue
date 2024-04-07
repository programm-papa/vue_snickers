<script setup lang="ts"></script>
<template>
    <a
        class="flex h-9 w-9 cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50"
        @click="$router.go(-1)"
        ><img src="/arrow-right.svg" alt="back" class="rotate-180"
    /></a>
</template>

<style scoped></style>
