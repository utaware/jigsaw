<script setup lang="ts">
import { RotateCcw, Settings } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

defineProps<{
  splitSize: number
}>()

defineEmits<{
  restart: []
  settings: []
}>()
</script>

<template>
  <header class="game-header">
    <div>
      <p class="eyebrow">{{ splitSize }} × {{ splitSize }} 拼图挑战</p>
      <h1>把画面重新拼完整</h1>
      <p class="description">依次选择两块拼图进行交换。</p>
    </div>

    <div class="header-actions">
      <Button variant="outline" type="button" @click="$emit('settings')">
        <Settings />
        重新设置
      </Button>
      <Button variant="outline" type="button" @click="$emit('restart')">
        <RotateCcw />
        重新打乱
      </Button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.game-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1.5rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border);

  h1 {
    margin: 0.25rem 0 0;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    line-height: 1.1;
    letter-spacing: 0;
  }
}

.eyebrow {
  margin: 0;
  color: var(--muted-foreground);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.description {
  margin: 0.6rem 0 0;
  color: var(--muted-foreground);
  font-size: 0.9rem;
}

.header-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

@media (max-width: 800px) {
  .game-header {
    align-items: start;
    flex-direction: column;
  }
}

@media (max-width: 520px) {
  .header-actions {
    width: 100%;

    > * {
      flex: 1;
    }
  }
}
</style>
