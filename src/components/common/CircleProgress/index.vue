<script setup lang="ts">
import CircleView from './circle.vue'
import LabelView from './label.vue'

const props = defineProps<{
  value?: number
  max?: number
  label?: string
  color?: string
}>()
</script>

<template>
  <div class="circle-progress flex flex-col">
    <!-- 标签部分 -->
    <slot name="label">
      <LabelView v-if="label" :label="label" />
    </slot>
    <!-- 环形部分 -->
    <CircleView :value="value" :color="color" :max="max" />
  </div>
</template>

<style scoped lang="scss"></style>
