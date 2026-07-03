<script setup>
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'
import { useCategoryStore } from '@/stores/categoryStore.js'
import { useCartStore } from '@/stores/cartStore'
import { useUserStore } from '@/stores/userStore'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()
const cartStore = useCartStore()
const userStore = useUserStore()

onMounted(() => {
  categoryStore.getCategory()

  if (userStore.userInfo?.token) {
    cartStore.updateNewList().catch(() => {})
  }
})
</script>
<template>
    <LayoutFixed />
    <LayoutNav />
    <LayoutHeader />
    <RouterView />
    <LayoutFooter />
</template>
