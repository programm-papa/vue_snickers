<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <router-link :to="'/'">
        <div
            class="go-back-button flex min-h-14 w-60 items-center gap-2 rounded-2xl bg-lime-500 pl-7 hover:bg-lime-600"
        >
            <svg
                class="relative rotate-180"
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1 7H14.7143"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M8.71436 1L14.7144 7L8.71436 13"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
            <p class="text-base font-semibold text-white">Вернуться в магазин</p>
        </div>
    </router-link>
</template>

<style lang="scss" scoped></style>
