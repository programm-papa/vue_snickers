<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import type ISelectProps from '@/intefaces/ISelectProps';

const { selected, listOptions } = defineProps<ISelectProps>();
defineEmits(['update:selected']); //Q? Почему данный синтаксис строго не ограничивает привязку к изменению данных при вызове компонента (например через v-model)
</script>

<template>
    <div class="flex rounded-xl border border-gray-200 px-4 py-3">
        <select
            :value="selected"
            @change="$emit('update:selected', ($event.target as HTMLTextAreaElement).value)"
            class="border-none px-1 outline-none"
        >
            <option v-for="(option, key) in listOptions" :key="key" :value="key">
                {{ option }}
            </option>
        </select>
    </div>
</template>

<style scoped></style>
