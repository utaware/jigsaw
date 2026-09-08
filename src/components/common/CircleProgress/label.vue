<script setup lang="ts">
import Typography from '@/components/common/Typography/index.vue'

const props = defineProps<{
  label?: string
}>()
</script>

<template>
  <div class="circle-progress-label text-base">
    <Typography tag="span">{{ label }}</Typography>
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
