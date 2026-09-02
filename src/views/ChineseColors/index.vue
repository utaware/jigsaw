<script setup lang="ts">
import { ChineseColors } from '@/views/ChineseColors/data/colors'

import TableView from './components/TableView/index.vue'
import HeaderView from './components/HeaderView/index.vue'
</script>

<template>
  <main class="chinese-colors">
    <!-- Header section -->
    <HeaderView :data="ChineseColors" />
    <!-- Data table section -->
    <TableView :data="ChineseColors" />
  </main>
</template>

<style scoped lang="scss">
.chinese-colors {
  width: min(100%, 76rem);
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

@media (max-width: 640px) {
  .chinese-colors {
    padding: 2rem 1rem;
  }
}
</style>
