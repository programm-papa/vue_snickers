<script setup lang="ts">
import NavItem from '@/components/header/NavItem.vue';

const listNavLinks = [
{
    name: 'cart',
    description: 'Корзина',
    icon: '/cart.svg',
    activeIcon: '/cart-filled.svg',
    status: false,
    to: '/basket'
},
{
    name: 'bookmarks',
    description: 'Закладки',
    icon: '/heart.svg',
    activeIcon: '/heart.svg',
    status: false,
    to: '/favorites'
},
{
    name: 'profile',
    description: 'Профиль',
    icon: '/profile.svg',
    activeIcon: '/profile.svg',
    status: false,
    to: '/'
}
]

</script>

<template>
    <div class="header-nav flex gap-8">
        <NavItem v-for="navLink in listNavLinks" :key="navLink.name" :nav-item-data="navLink" />
    </div>
</template>

<style scoped></style>
