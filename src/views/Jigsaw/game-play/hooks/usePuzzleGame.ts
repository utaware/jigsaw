import { computed, onBeforeUnmount, ref } from 'vue'
import type { ComputedRef } from 'vue'

import {
  calculateProgress,
  createShuffledPieces,
  formatElapsedTime,
  isPuzzleComplete,
} from '@/views/Jigsaw/game-play/utils'

interface UsePuzzleGameOptions {
  splitSize: ComputedRef<number>
}

export function usePuzzleGame({ splitSize }: UsePuzzleGameOptions) {
  const pieces = ref(createShuffledPieces(splitSize.value))
  const selectedIndex = ref<number | null>(null)
  const moves = ref(0)
  const elapsedSeconds = ref(0)
  const isCompleted = ref(false)
  let timer: ReturnType<typeof setInterval> | undefined

  const formattedTime = computed(() => formatElapsedTime(elapsedSeconds.value))
  const progress = computed(() => calculateProgress(pieces.value))

  function stopTimer() {
    if (timer) clearInterval(timer)
    timer = undefined
  }

  function startTimer() {
    stopTimer()
    timer = setInterval(() => {
      elapsedSeconds.value += 1
    }, 1000)
  }

  function startGame() {
    pieces.value = createShuffledPieces(splitSize.value)
    selectedIndex.value = null
    moves.value = 0
    elapsedSeconds.value = 0
    isCompleted.value = false
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

    if (isPuzzleComplete(pieces.value)) {
      isCompleted.value = true
      stopTimer()
    }
  }

  onBeforeUnmount(stopTimer)

  return {
    pieces,
    selectedIndex,
    moves,
    isCompleted,
    formattedTime,
    progress,
    startGame,
    selectPiece,
  }
}
