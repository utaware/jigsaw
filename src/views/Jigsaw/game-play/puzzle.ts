import type { CSSProperties } from 'vue'

export interface PuzzlePiece {
  id: number
  sourceIndex: number
}

export function createShuffledPieces(splitSize: number): PuzzlePiece[] {
  const pieces = Array.from({ length: splitSize * splitSize }, (_, index) => ({
    id: index,
    sourceIndex: index,
  }))

  do {
    for (let index = pieces.length - 1; index > 0; index -= 1) {
      const targetIndex = Math.floor(Math.random() * (index + 1))
      ;[pieces[index], pieces[targetIndex]] = [
        pieces[targetIndex],
        pieces[index],
      ]
    }
  } while (isPuzzleComplete(pieces))

  return pieces
}

export function isPuzzleComplete(pieces: PuzzlePiece[]): boolean {
  return pieces.every((piece, index) => piece.sourceIndex === index)
}

export function calculateProgress(pieces: PuzzlePiece[]): number {
  if (!pieces.length) return 0

  const correctPieces = pieces.filter(
    (piece, index) => piece.sourceIndex === index,
  ).length

  return Math.round((correctPieces / pieces.length) * 100)
}

export function formatElapsedTime(elapsedSeconds: number): string {
  const minutes = Math.floor(elapsedSeconds / 60)
  const seconds = elapsedSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

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
