<script setup lang="ts"></script>

<template>
    <div class="catalog-header flex items-center gap-6 px-11 py-5">
        <!--TODO: тут незачем слот, так как тут нет никакой логики, а только обертка с классами  -->
        <!--Q?: Взял за пример реализацию через слот от ребят с Дипрофайла, где для кастомизации использовали компонент с слотом. Как вариант слышал еще (только слышал, сам не использовал) про extends, но опять же нет никакой логики. Буду благодарен, если предложишь более аккуратное решение-->
        <slot />
    </div>
</template>

<style scoped></style>
