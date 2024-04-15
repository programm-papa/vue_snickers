<script setup lang="ts"></script>

<template>
    <div class="catalog-header flex items-center gap-6 px-11 py-5">
        <!--TODO: тут незачем слот, так как тут нет никакой логики, а только обертка с классами (более подробно могу рассказть) -->
        <slot />
    </div>
</template>

<style scoped></style>
