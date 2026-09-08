<script setup lang="ts">
import CMYKView from './CMYK.vue'

import Typography from '@/components/common/Typography/index.vue'

import type { TChineseColor } from '@/views/ChineseColors/types'

const props = defineProps<{
  totalCount: number
  currentSelectedColor: TChineseColor
}>()
</script>

<template>
  <header class="flex justify-between items-center">
    <div class="flex flex-col gap-2">
      <Typography tag="p" class="eyebrow"
        >Chinese Traditional Colors</Typography
      >
      <Typography tag="h1">中国传统色</Typography>
      <Typography tag="p"
        >收录 {{ totalCount }} 种颜色及其常用色彩参数。</Typography
      >
    </div>
    <CMYKView :colors="currentSelectedColor" />
  </header>
</template>

<style scoped>
.eyebrow {
  color: var(--muted-foreground);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
