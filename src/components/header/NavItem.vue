<script setup lang="ts">
interface INavItevProps {
    navItemData: {
        name: string;
        description: string;
        icon: string;
        activeIcon: string;
        status: boolean;
    };
}

defineProps<INavItevProps>();
</script>

<template>
    <div class="header-nav-item flex cursor-pointer items-center gap-2">
        <img :src="navItemData.status ? navItemData.activeIcon : navItemData.icon" alt="" class="header-nav-item__icon" />
        <p class="header-nav-item__description">{{ navItemData.description }}</p>
    </div>
</template>

<style scoped></style>
