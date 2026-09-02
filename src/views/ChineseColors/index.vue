<script setup lang="ts">
import { ref } from 'vue'

import { ChineseColors } from '@/views/ChineseColors/data/colors'

import TableView from './components/TableView/index.vue'
import HeaderView from './components/HeaderView/index.vue'

import type { TChineseColor } from '@/views/ChineseColors/types'

const [defaultColor] = ChineseColors

const currentSelectedColor = ref<TChineseColor>(defaultColor)

const handleRowClick = (row: TChineseColor) => {
  currentSelectedColor.value = row
}
</script>

<template>
  <main class="chinese-colors">
    <!-- Header section -->
    <HeaderView
      :total-count="ChineseColors.length"
      :current-selected-color="currentSelectedColor"
    />
    <!-- Data table section -->
    <TableView :data="ChineseColors" @row-click="handleRowClick">
      <!-- Swatch column -->
      <template #cell-swatch="{ row }">
        <span
          class="block w-24 h-8 rounded-md border border-foreground/15 shadow-sm"
          :style="{ backgroundColor: row.hex }"
          :title="row.hex"
        />
      </template>
    </TableView>
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
