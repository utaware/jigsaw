<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** 当前进度值。 */
    value?: number
    /** 进度最大值。 */
    max?: number
    /** 进度环的颜色。 */
    color?: string
  }>(),
  {
    value: 35,
    max: 100,
    color: '#00ffff',
  },
)

const radius = 42
const circumference = 2 * Math.PI * radius
const progressRatio = computed(() => {
  if (props.max <= 0) return 0
  return Math.min(Math.max(props.value / props.max, 0), 1)
})
const progressValue = computed(() => Math.round(progressRatio.value * 100))
const dashOffset = computed(() => circumference * (1 - progressRatio.value))
</script>

<template>
  <div
    class="progress"
    role="progressbar"
    :style="{ color: color }"
    :aria-valuemin="0"
    :aria-valuemax="max"
    :aria-valuenow="value"
  >
    <svg class="progress-ring" viewBox="0 0 100 100" aria-hidden="true">
      <circle class="progress-track" :cx="50" :cy="50" :r="radius" />
      <circle
        class="progress-value"
        :cx="50"
        :cy="50"
        :r="radius"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
      />
    </svg>
    <span class="progress-number">{{ progressValue }}</span>
  </div>
</template>

<style scoped lang="scss">
.progress {
  position: relative;
  width: 3.6rem;
  height: 3.6rem;
  place-items: center;
  flex: 0 0 auto;
  color: #fff;
  overflow: hidden;
  // 进度环的颜色由外部通过 color 属性控制
  &-label {
    font-size: 1rem;
    line-height: 1;
    color: var(--muted-foreground);
  }
  // 进度环的旋转角度调整，使起点在顶部
  &-ring {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  // 进度环的轨道和进度值的公共样式控制
  &-track,
  &-value {
    fill: none;
    stroke-width: 8;
  }

  &-track {
    stroke: rgba(0, 0, 0, 0.1);
  }

  &-value {
    stroke: currentColor;
    stroke-linecap: butt;
    transition: stroke-dashoffset 450ms ease;
  }
  // 进度数字的样式控制
  &-number {
    position: absolute;
    inset: 50% auto auto 50%;
    font-size: 1.2rem;
    line-height: 1;
    transform: translate(-50%, -50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .progress-value {
    transition: none;
  }
}
</style>
