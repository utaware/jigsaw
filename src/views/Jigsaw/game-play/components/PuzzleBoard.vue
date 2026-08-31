<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import { Check, RotateCcw } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

import type { PuzzlePiece } from '../puzzle'
import { createPieceStyle } from '../puzzle'

const props = defineProps<{
  pieces: PuzzlePiece[]
  splitSize: number
  imageUrl: string
  selectedIndex: number | null
  isCompleted: boolean
  formattedTime: string
  moves: number
}>()

defineEmits<{
  select: [index: number]
  restart: []
}>()

const boardStyle = computed<CSSProperties>(() => ({
  gridTemplateColumns: `repeat(${props.splitSize}, minmax(0, 1fr))`,
}))

function pieceStyle(piece: PuzzlePiece) {
  return createPieceStyle(piece, props.splitSize, props.imageUrl)
}
</script>

<template>
  <div class="board-frame">
    <div class="puzzle-board" :style="boardStyle">
      <button
        v-for="(piece, index) in pieces"
        :key="piece.id"
        type="button"
        class="puzzle-piece"
        :class="{
          selected: selectedIndex === index,
          correct: piece.sourceIndex === index,
        }"
        :style="pieceStyle(piece)"
        :aria-label="`拼图块 ${index + 1}${selectedIndex === index ? '，已选中' : ''}`"
        :aria-pressed="selectedIndex === index"
        @click="$emit('select', index)"
      />
    </div>

    <div v-if="isCompleted" class="completion-panel" role="status">
      <span class="completion-icon"><Check /></span>
      <h2>拼图完成</h2>
      <p>用时 {{ formattedTime }}，共交换 {{ moves }} 次。</p>
      <Button type="button" @click="$emit('restart')">
        <RotateCcw />
        再玩一次
      </Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.board-frame {
  position: relative;
  width: 100%;
  max-width: 42rem;
  aspect-ratio: 1;
  justify-self: center;
  padding: 0.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: color-mix(in oklch, var(--muted) 55%, var(--background));
  box-shadow: 0 18px 50px
    color-mix(in oklch, var(--foreground) 10%, transparent);
}

.puzzle-board {
  width: 100%;
  height: 100%;
  display: grid;
  gap: 2px;
  overflow: hidden;
  border-radius: calc(var(--radius) - 3px);
  background: var(--border);
}

.puzzle-piece {
  min-width: 0;
  min-height: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background-repeat: no-repeat;
  cursor: pointer;
  transition:
    filter 150ms ease,
    transform 150ms ease,
    box-shadow 150ms ease;

  &:hover {
    filter: brightness(1.08);
  }

  &:focus-visible {
    position: relative;
    z-index: 2;
    outline: 3px solid var(--ring);
    outline-offset: -3px;
  }

  &.selected {
    position: relative;
    z-index: 2;
    box-shadow: inset 0 0 0 4px var(--primary);
    filter: brightness(1.12);
    transform: scale(0.94);
  }

  &.correct:not(.selected) {
    box-shadow: inset 0 0 0 1px
      color-mix(in oklch, var(--background) 50%, transparent);
  }
}

.completion-panel {
  position: absolute;
  inset: 0.5rem;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border-radius: calc(var(--radius) - 2px);
  background: color-mix(in oklch, var(--background) 88%, transparent);
  backdrop-filter: blur(8px);
  text-align: center;

  h2,
  p {
    margin: 0;
  }

  p {
    color: var(--muted-foreground);
    font-size: 0.9rem;
  }
}

.completion-icon {
  width: 3rem;
  height: 3rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--primary);
  color: var(--primary-foreground);

  svg {
    width: 1.4rem;
    height: 1.4rem;
  }
}
</style>
