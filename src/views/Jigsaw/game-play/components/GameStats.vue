<script setup lang="ts">
defineProps<{
  formattedTime: string
  moves: number
  progress: number
}>()
</script>

<template>
  <div class="stats" aria-label="游戏状态">
    <div class="stat">
      <span>用时</span>
      <strong>{{ formattedTime }}</strong>
    </div>
    <div class="stat">
      <span>交换</span>
      <strong>{{ moves }} 次</strong>
    </div>
    <div class="stat">
      <span>完成度</span>
      <strong>{{ progress }}%</strong>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
}

.stat {
  display: grid;
  gap: 0.15rem;
  padding: 0.75rem 1rem;

  & + & {
    border-left: 1px solid var(--border);
  }

  span {
    color: var(--muted-foreground);
    font-size: 0.72rem;
  }

  strong {
    font-size: 1rem;
    font-variant-numeric: tabular-nums;
  }
}

@media (max-width: 520px) {
  .stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .stat {
    padding: 0.65rem;
  }
}
</style>
