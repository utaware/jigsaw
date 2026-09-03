<script setup lang="ts">
import { onMounted } from 'vue'

import LayoutHeader from '@/components/layout/Header/index.vue'
import { useThemeStore } from '@/stores/theme'

import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <div class="min-h-svh flex flex-col bg-background text-foreground">
    <LayoutHeader />
    <div class="flex-1">
      <RouterView />
    </div>
    <!-- Toaster for displaying toast notifications -->
    <Toaster position="top-center" />
  </div>
</template>
