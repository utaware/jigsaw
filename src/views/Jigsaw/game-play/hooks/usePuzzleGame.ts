import { computed, onBeforeUnmount, ref } from 'vue'
import type { ComputedRef } from 'vue'

import {
  calculateProgress,
  createShuffledPieces,
  formatElapsedTime,
  isPuzzleComplete,
} from '@/views/Jigsaw/game-play/utils'

interface UsePuzzleGameOptions {
  /** 当前拼图每行和每列的图块数量。 */
  splitSize: ComputedRef<number>
}

/**
 * 管理拼图游戏的计时、图块选择交换、进度及完成状态。
 *
 * @param options 游戏运行所需的响应式配置。
 * @returns 游戏状态以及开始游戏、选择图块等交互方法。
 */
export function usePuzzleGame({ splitSize }: UsePuzzleGameOptions) {
  const pieces = ref(createShuffledPieces(splitSize.value))
  const selectedIndex = ref<number | null>(null)
  const moves = ref(0)
  const elapsedSeconds = ref(0)
  const isCompleted = ref(false)
  let timer: ReturnType<typeof setInterval> | undefined

  const formattedTime = computed(() => formatElapsedTime(elapsedSeconds.value))
  const progress = computed(() => calculateProgress(pieces.value))

  /** 停止当前计时器，并清除计时器引用。 */
  function stopTimer() {
    if (timer) clearInterval(timer)
    timer = undefined
  }

  /** 重置已有计时器并开始累计游戏时间。 */
  function startTimer() {
    stopTimer()
    timer = setInterval(() => {
      elapsedSeconds.value += 1
    }, 1000)
  }

  /** 重置游戏状态、重新打乱图块并启动计时。 */
  function startGame() {
    pieces.value = createShuffledPieces(splitSize.value)
    selectedIndex.value = null
    moves.value = 0
    elapsedSeconds.value = 0
    isCompleted.value = false
    startTimer()
  }

  /**
   * 处理图块选择；连续选择两个不同图块时交换其棋盘位置。
   *
   * @param index 被点击图块在当前棋盘中的位置索引。
   */
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
