<script setup lang="ts"></script>

<template>
    <div class="flex h-full w-full flex-1 items-center flex-col justify-center gap-7">
        <!--TODO: тут незачем слот, так как тут нет никакой логики, а только обертка с классами (более подробно могу рассказть) -->
        <slot />
    </div>
</template>

<style scoped></style>
