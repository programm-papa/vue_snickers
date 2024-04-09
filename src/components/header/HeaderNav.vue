<script setup lang="ts">
import NavItem from '@/components/header/NavItem.vue';

import { reactive } from 'vue';

const cartMenuInfo = {
    name: 'cart',
    description: 'Корзина',
    icon: '/cart.svg',
    activeIcon: '/cart-filled.svg',
    status: false,
    to: '/basket'
};

const likesMenuInfo = {
    name: 'cart',
    description: 'Закладки',
    icon: '/heart.svg',
    activeIcon: '/heart.svg',
    status: false,
    to: '/favorites'
};

const profileMenuInfo = {
    name: 'cart',
    description: 'Профиль',
    icon: '/profile.svg',
    activeIcon: '/profile.svg',
    status: false,
    to: '/'
};
</script>

<template>
    <div class="header-nav flex gap-8">
        <NavItem :nav-item-data="cartMenuInfo"/>
        <NavItem :nav-item-data="likesMenuInfo"/>
        <NavItem :nav-item-data="profileMenuInfo"/>
    </div>
</template>

<style scoped></style>
