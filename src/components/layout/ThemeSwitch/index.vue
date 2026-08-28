<script setup lang="ts">
import { computed } from 'vue'
import { Moon, Sun } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()

const themeTitle = computed(() => (isDark ? '切换至浅色模式' : '切换至深色模式')) 
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    class="size-9 rounded-full"
    :title="themeTitle"
    :aria-label="themeTitle"
    @click="toggleTheme"
  >
    <Sun v-if="isDark" class="size-4.5 transition-transform duration-200 rotate-0 hover:rotate-45" />
    <Moon v-else class="size-4.5 transition-transform duration-200 -rotate-12 hover:rotate-0" />
  </Button>
</template>

<style scoped>

</style>