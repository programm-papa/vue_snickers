<script setup lang="ts">
import { useSneakersStore } from '@/stores';
import { RouterLink } from 'vue-router';

// TODO: Лучше делать больше алиасов, например: "@ui" (более подробно могу рассказть)
import CatalogBlockHeader from '@/components/ui/CatalogBlockHeader.vue';
import GoBackButton from '@/components/ui/GoBackButton.vue';
import ProductList from '@/components/products/ProductList.vue';
import GoBackGreenButton from '@/components/ui/GoBackGreenButton.vue';
import BlankPlug from '@/components/plug/BlankPlug.vue';

const sneakersStore = useSneakersStore();
</script>
<template>
    <catalog-block-header>
        <go-back-button />
        <div class="catalog-header__title text-4xl font-bold">Моя корзина</div>
    </catalog-block-header>
    <template v-if="sneakersStore.getListBasketAddedItems.length">
        <router-link :to="'/'" />
        <product-list :productList="sneakersStore.getListBasketAddedItems" />
    </template>
    <template v-else>
        <blank-plug>
            <img src="/emoji-2.png" alt="emoji" class="w-20 object-cover" />
            <div class="mb-10 text-center">
                <p class="mb-3 text-2xl font-semibold">Корзина пуста :(</p>
                <p class="mb-3 text-base font-normal opacity-40">
                    Вы ничего не добавляли в корзину
                </p>
            </div>
            <go-back-green-button />
        </blank-plug>
    </template>
</template>

<style scoped></style>
