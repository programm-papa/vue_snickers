<script setup lang="ts">
interface INavItevProps {
    navItemData: {
        name: string;
        description: string;
        icon: string;
        activeIcon: string;
        status: boolean;
        to: string;
    };
}

defineProps<INavItevProps>();
</script>

<template>
    <RouterLink :to="navItemData.to" class="header-nav-item flex cursor-pointer items-center gap-2">
        <img :src="navItemData.status ? navItemData.activeIcon : navItemData.icon" alt="" class="header-nav-item__icon" />
        <p class="header-nav-item__description">{{ navItemData.description }}</p>
    </RouterLink>
</template>

<style scoped></style>
