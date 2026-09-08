<script setup lang="ts">
const props = defineProps<{
  label?: string
}>()
</script>

<template>
  <div class="circle-progress-label text-base">
    {{ label }}
  </div>
</template>

<style scoped>
.circle-progress-label {
  padding-block: 0.5rem;
  font-size: 0.8rem;
  line-height: 1;
  color: var(--muted-foreground);
}
</style>
