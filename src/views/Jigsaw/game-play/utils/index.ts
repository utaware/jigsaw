import type { CSSProperties } from 'vue'
import { padStart, shuffle, times } from 'lodash-es'

export interface PuzzlePiece {
  /** 图块的稳定标识，用于列表渲染。 */
  id: number
  /** 图块在完整图片中的原始位置索引。 */
  sourceIndex: number
}

/**
 * 创建指定规格的拼图并随机打乱。
 *
 * @param splitSize 每行和每列的图块数量。
 * @returns 已打乱且不会处于初始完成状态的图块列表。
 */
export function createShuffledPieces(splitSize: number): PuzzlePiece[] {
  const pieces = times(splitSize * splitSize, index => ({
    id: index,
    sourceIndex: index,
  }))

  let shuffledPieces: PuzzlePiece[]
  do {
    shuffledPieces = shuffle(pieces)
  } while (isPuzzleComplete(shuffledPieces))

  return shuffledPieces
}

/**
 * 判断所有图块是否都回到其原始位置。
 *
 * @param pieces 当前按棋盘位置排列的图块列表。
 * @returns 全部图块位置正确时返回 `true`。
 */
export function isPuzzleComplete(pieces: PuzzlePiece[]): boolean {
  return pieces.every((piece, index) => piece.sourceIndex === index)
}

/**
 * 计算当前处于正确位置的图块占比。
 *
 * @param pieces 当前按棋盘位置排列的图块列表。
 * @returns 取整后的完成百分比，范围为 0 到 100。
 */
export function calculateProgress(pieces: PuzzlePiece[]): number {
  if (!pieces.length) return 0

  const correctPieces = pieces.filter(
    (piece, index) => piece.sourceIndex === index,
  ).length

  return Math.round((correctPieces / pieces.length) * 100)
}

/**
 * 将累计秒数格式化为两位数的 `MM:SS` 文本。
 *
 * @param elapsedSeconds 游戏累计秒数。
 * @returns 格式化后的计时文本。
 */
export function formatElapsedTime(elapsedSeconds: number): string {
  const minutes = Math.floor(elapsedSeconds / 60)
  const seconds = elapsedSeconds % 60

  return `${padStart(String(minutes), 2, '0')}:${padStart(String(seconds), 2, '0')}`
}

/**
 * 根据图块原始位置计算其背景图裁切样式。
 *
 * @param piece 当前图块信息。
 * @param splitSize 每行和每列的图块数量。
 * @param imageUrl 完整拼图图片地址或 Base64 Data URL。
 * @returns 可直接绑定到图块元素的背景样式。
 */
export function createPieceStyle(
  piece: PuzzlePiece,
  splitSize: number,
  imageUrl: string,
): CSSProperties {
  const column = piece.sourceIndex % splitSize
  const row = Math.floor(piece.sourceIndex / splitSize)
  const denominator = Math.max(splitSize - 1, 1)

  return {
    backgroundImage: `url("${imageUrl}")`,
    backgroundSize: `${splitSize * 100}% ${splitSize * 100}%`,
    backgroundPosition: `${(column / denominator) * 100}% ${(row / denominator) * 100}%`,
  }
}
