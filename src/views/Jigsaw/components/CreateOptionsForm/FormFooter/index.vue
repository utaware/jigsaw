<script setup lang="ts">
import { Button } from '@/components/ui/button'

const props = defineProps<{
  canStartGame: boolean
}>()

const emits = defineEmits<{
  enter: []
}>()

const handleStartGame = () => {
  emits('enter')
}
</script>

<template>
  <div class="w-full flex justify-center">
    <Button
      class="px-4 py-2 max-w-xs flex-1"
      :disabled="!canStartGame"
      @click="handleStartGame"
    >
      开始游戏
    </Button>
  </div>
</template>

<style scoped></style>
