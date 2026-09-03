<script setup lang="ts">
import clipboardy from 'clipboardy'

import { toast } from 'vue-sonner'

const props = defineProps<{
  text: string
}>()

// Handle double click event to copy text to clipboard
const handleDoubleClick = async () => {
  const { text } = props
  await clipboardy.write(text)
  toast.success('Text copied to clipboard!')
}
</script>

<template>
  <div class="cursor-copy" @click="handleDoubleClick">
    <slot></slot>
  </div>
</template>

<style scoped></style>
