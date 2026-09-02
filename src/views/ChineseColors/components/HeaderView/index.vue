<script setup lang="ts">
import type { TChineseColor } from '@/views/ChineseColors/types'

const props = defineProps<{
  data: Array<TChineseColor>
}>()
</script>

<template>
  <header class="page-header">
    <p class="eyebrow">Chinese Traditional Colors</p>
    <h1>中国传统色</h1>
    <p>收录 {{ data.length }} 种颜色及其常用色彩参数。</p>
  </header>
</template>

<style scoped>
.page-header {
  margin-bottom: 2rem;

  h1,
  p {
    margin: 0;
  }

  h1 {
    margin-top: 0.35rem;
    font-size: 2rem;
    line-height: 1.2;
  }

  > p:last-child {
    margin-top: 0.6rem;
    color: var(--muted-foreground);
  }
}

.eyebrow {
  color: var(--muted-foreground);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
