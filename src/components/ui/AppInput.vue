<script setup lang="ts">
import { ref } from 'vue';

const inputValue = ref<string>('');
</script>

<template>
    <div class="flex rounded-xl border border-gray-200 px-4 py-3">
        <img src="/search.svg" alt="" />
        <input
            type="text"
            class="border-none px-2 outline-none"
            placeholder="Поиск..."
            v-model="inputValue"
            @input="$emit('searchInput', inputValue)"
        />
    </div>
</template>

<style scoped></style>
