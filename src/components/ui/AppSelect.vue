<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import type ISelectProps from '@/intefaces/ISelectProps';

const { selected, listOptions } = defineProps<ISelectProps>();
defineEmits(['update:selected']);
</script>

<template>
    <div class="flex rounded-xl border border-gray-200 px-4 py-3">
        <!--TODO: придирка: я бы сделал бы порядок артибутов и событий такой - дерективы, класс, пропсы, события. И так везде, чтобы читалось лучше-->
        <select
            class="border-none px-1 outline-none"
            :value="selected"
            @change="$emit('update:selected', ($event.target as HTMLTextAreaElement).value)"
        >
            <option v-for="(option, key) in listOptions" :key="`option_${key}`" :value="key">
                {{ option }}
            </option>
        </select>
    </div>
</template>

<style scoped></style>
