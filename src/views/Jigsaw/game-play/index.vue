<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { CSSProperties } from 'vue'
import { useRouter } from 'vue-router'
import { Check, Eye, RotateCcw, Settings } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { useJigsawStore } from '@/stores/jigsaw'

interface PuzzlePiece {
  id: number
  sourceIndex: number
}

const router = useRouter()
const jigsawStore = useJigsawStore()

const pieces = ref<PuzzlePiece[]>([])
const selectedIndex = ref<number | null>(null)
const moves = ref(0)
const elapsedSeconds = ref(0)
const isCompleted = ref(false)
const showReference = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

const splitSize = computed(() => jigsawStore.gameOptions.splitSize)
const imageUrl = computed(() => jigsawStore.gameOptions.imgUrl)
const formattedTime = computed(() => {
  const minutes = Math.floor(elapsedSeconds.value / 60)
  const seconds = elapsedSeconds.value % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})
const progress = computed(() => {
  if (!pieces.value.length) return 0
  const correctPieces = pieces.value.filter(
    (piece, index) => piece.sourceIndex === index,
  ).length
  return Math.round((correctPieces / pieces.value.length) * 100)
})
const boardStyle = computed<CSSProperties>(() => ({
  gridTemplateColumns: `repeat(${splitSize.value}, minmax(0, 1fr))`,
}))

function pieceStyle(piece: PuzzlePiece): CSSProperties {
  const column = piece.sourceIndex % splitSize.value
  const row = Math.floor(piece.sourceIndex / splitSize.value)
  const denominator = Math.max(splitSize.value - 1, 1)

  return {
    backgroundImage: `url("${imageUrl.value}")`,
    backgroundSize: `${splitSize.value * 100}% ${splitSize.value * 100}%`,
    backgroundPosition: `${(column / denominator) * 100}% ${(row / denominator) * 100}%`,
  }
}

function shuffledPieces(): PuzzlePiece[] {
  const result = Array.from(
    { length: splitSize.value * splitSize.value },
    (_, index) => ({ id: index, sourceIndex: index }),
  )

  do {
    for (let index = result.length - 1; index > 0; index -= 1) {
      const targetIndex = Math.floor(Math.random() * (index + 1))
      ;[result[index], result[targetIndex]] = [
        result[targetIndex],
        result[index],
      ]
    }
  } while (result.every((piece, index) => piece.sourceIndex === index))

  return result
}

function startTimer() {
  stopTimer()
  timer = setInterval(() => {
    elapsedSeconds.value += 1
  }, 1000)
}

function stopTimer() {
  if (timer) clearInterval(timer)
  timer = undefined
}

function startGame() {
  pieces.value = shuffledPieces()
  selectedIndex.value = null
  moves.value = 0
  elapsedSeconds.value = 0
  isCompleted.value = false
  showReference.value = false
  startTimer()
}

function selectPiece(index: number) {
  if (isCompleted.value) return

  if (selectedIndex.value === null) {
    selectedIndex.value = index
    return
  }

  if (selectedIndex.value === index) {
    selectedIndex.value = null
    return
  }

  const firstIndex = selectedIndex.value
  ;[pieces.value[firstIndex], pieces.value[index]] = [
    pieces.value[index],
    pieces.value[firstIndex],
  ]
  selectedIndex.value = null
  moves.value += 1

  if (
    pieces.value.every((piece, pieceIndex) => piece.sourceIndex === pieceIndex)
  ) {
    isCompleted.value = true
    stopTimer()
  }
}

function returnToOptions() {
  router.push({ name: 'game-jigsaw-options' })
}

onMounted(() => {
  if (!imageUrl.value || splitSize.value < 2) {
    router.replace({ name: 'game-jigsaw-options' })
    return
  }

  startGame()
})

onBeforeUnmount(stopTimer)
</script>

<template>
  <section v-if="imageUrl" class="game-shell">
    <header class="game-header">
      <div>
        <p class="eyebrow">{{ splitSize }} × {{ splitSize }} 拼图挑战</p>
        <h1>把画面重新拼完整</h1>
        <p class="description">依次选择两块拼图进行交换。</p>
      </div>

      <div class="header-actions">
        <Button variant="outline" type="button" @click="returnToOptions">
          <Settings />
          重新设置
        </Button>
        <Button variant="outline" type="button" @click="startGame">
          <RotateCcw />
          重新打乱
        </Button>
      </div>
    </header>

    <div class="game-layout">
      <div class="board-column">
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
              @click="selectPiece(index)"
            />
          </div>

          <div v-if="isCompleted" class="completion-panel" role="status">
            <span class="completion-icon"><Check /></span>
            <h2>拼图完成</h2>
            <p>用时 {{ formattedTime }}，共交换 {{ moves }} 次。</p>
            <Button type="button" @click="startGame">
              <RotateCcw />
              再玩一次
            </Button>
          </div>
        </div>
      </div>

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
            :aria-label="showReference ? '隐藏原图' : '查看原图'"
            :title="showReference ? '隐藏原图' : '查看原图'"
            @click="showReference = !showReference"
          >
            <Eye />
          </Button>
        </div>

        <button
          type="button"
          class="reference-image"
          :class="{ revealed: showReference }"
          :aria-label="showReference ? '隐藏原图' : '显示原图'"
          @click="showReference = !showReference"
        >
          <img :src="imageUrl" alt="拼图原始参考图" />
          <span v-if="!showReference">点击查看</span>
        </button>

        <div class="tip">
          <span class="tip-number">01</span>
          <p>先寻找边缘和颜色连续的图块，再进行交换。</p>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped lang="scss">
.game-shell {
  width: min(100%, 76rem);
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
}

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

.game-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 17rem;
  gap: 1.5rem;
  align-items: start;
}

.board-column {
  min-width: 0;
  display: grid;
  gap: 0.75rem;
}

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
  .game-header {
    align-items: start;
    flex-direction: column;
  }

  .game-layout {
    grid-template-columns: 1fr;
  }

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
  .header-actions {
    width: 100%;

    > * {
      flex: 1;
    }
  }

  .stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .stat {
    padding: 0.65rem;
  }

  .reference-panel {
    grid-template-columns: 1fr;
  }

  .reference-image {
    grid-column: 1;
    grid-row: auto;
  }
}
</style>
