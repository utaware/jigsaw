<script setup lang="ts">
import { ref } from 'vue'

import { ChineseColors } from '@/views/ChineseColors/data/colors'

import ClipPasteText from '@/components/common/ClipPasteText/index.vue'

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
  <main class="chinese-colors flex flex-col gap-4">
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
      <!-- RGB column -->
      <template #cell-RGB="{ row }">
        <ClipPasteText :text="row.RGB.join(',')">
          <span class="text-muted-foreground">{{ row.RGB.join(',') }}</span>
        </ClipPasteText>
      </template>
      <!-- HEX column -->
      <template #cell-hex="{ row }">
        <ClipPasteText :text="row.hex">
          <span class="text-muted-foreground">{{ row.hex }}</span>
        </ClipPasteText>
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
