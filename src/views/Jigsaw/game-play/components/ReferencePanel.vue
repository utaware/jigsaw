<script setup lang="ts">
import { ref } from 'vue'
import { Eye } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

defineProps<{
  imageUrl: string
}>()

const isRevealed = ref(false)
</script>

<template>
  <aside class="reference-panel">
    <div class="reference-heading">
      <div>
        <p class="eyebrow">参考图</p>
        <h2>原始画面</h2>
      </div>
      <Button
        variant="ghost"
        size="icon"
        type="button"
        :aria-label="isRevealed ? '隐藏原图' : '查看原图'"
        :title="isRevealed ? '隐藏原图' : '查看原图'"
        @click="isRevealed = !isRevealed"
      >
        <Eye />
      </Button>
    </div>

    <button
      type="button"
      class="reference-image"
      :class="{ revealed: isRevealed }"
      :aria-label="isRevealed ? '隐藏原图' : '显示原图'"
      @click="isRevealed = !isRevealed"
    >
      <img :src="imageUrl" alt="拼图原始参考图" />
      <span v-if="!isRevealed">点击查看</span>
    </button>

    <div class="tip">
      <span class="tip-number">01</span>
      <p>先寻找边缘和颜色连续的图块，再进行交换。</p>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.reference-panel {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
}

.reference-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    margin: 0.15rem 0 0;
    font-size: 1rem;
  }
}

.eyebrow {
  margin: 0;
  color: var(--muted-foreground);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.reference-image {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: calc(var(--radius) - 2px);
  background: var(--muted);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(16px) brightness(0.65);
    transform: scale(1.08);
    transition:
      filter 180ms ease,
      transform 180ms ease;
  }

  span {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    color: white;
    font-size: 0.82rem;
    font-weight: 700;
  }

  &.revealed img {
    filter: none;
    transform: scale(1);
  }
}

.tip {
  display: flex;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);

  p {
    margin: 0;
    color: var(--muted-foreground);
    font-size: 0.78rem;
    line-height: 1.55;
  }
}

.tip-number {
  color: var(--foreground);
  font-size: 0.72rem;
  font-weight: 800;
}

@media (max-width: 800px) {
  .reference-panel {
    grid-template-columns: 1fr minmax(8rem, 12rem);
    align-items: center;
  }

  .reference-heading,
  .tip {
    grid-column: 1;
  }

  .reference-image {
    grid-column: 2;
    grid-row: 1 / span 2;
  }
}

@media (max-width: 520px) {
  .reference-panel {
    grid-template-columns: 1fr;
  }

  .reference-image {
    grid-column: 1;
    grid-row: auto;
  }
}
</style>
