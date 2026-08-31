<script setup lang="ts">
const props = defineProps<{
  croppedImageDataUrl: string
  size: number
}>()
</script>

<template>
  <div
    v-if="croppedImageDataUrl"
    class="space-y-2 flex flex-col justify-center items-center"
  >
    <p class="text-sm font-medium text-foreground">
      裁剪结果（{{ size }} × {{ size }}）
    </p>
    <img
      :src="croppedImageDataUrl"
      :alt="`${size} × ${size} 裁剪结果`"
      :width="size"
      :height="size"
      class="rounded-md border border-border object-cover"
    />
  </div>
</template>

<style scoped></style>
