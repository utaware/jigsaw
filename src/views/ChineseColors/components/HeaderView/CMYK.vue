<script setup lang="ts">
import CircleProgress from '@/components/common/CircleProgress/index.vue'

import type { TChineseColor } from '@/views/ChineseColors/types'

const CMYKColors = [
  {
    label: 'C',
    color: '#00FFFF',
  },
  {
    label: 'M',
    color: '#FF00FF',
  },
  {
    label: 'Y',
    color: '#FFFF00',
  },
  {
    label: 'K',
    color: '#333333',
  },
]

const props = defineProps<{
  colors: TChineseColor
}>()

const getColorValue = (index: number) => {
  const {
    colors: { CMYK },
  } = props
  return CMYK[index] ?? 0
}
</script>

<template>
  <div class="cmyk-colors flex gap-3">
    <div
      class="cmyk-colors-item"
      v-for="({ label, color }, index) in CMYKColors"
      :key="label"
    >
      <CircleProgress
        :max="100"
        :value="getColorValue(index)"
        :label="label"
        :color="color"
      />
    </div>
  </div>
</template>

<style scoped></style>
