<script setup lang="ts">
import LayoutHeader from '@/components/layout/Header/index.vue'
import { useTheme } from '@/composables/useTheme'

const { initTheme } = useTheme()
initTheme()
</script>

<template>
  <div class="min-h-svh flex flex-col bg-background text-foreground">
    <LayoutHeader />
    <div class="flex-1">
      <RouterView />
    </div>
  </div>
</template>
