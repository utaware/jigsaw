<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useJigsawStore } from '@/stores/jigsaw'

import GameHeader from './components/GameHeader.vue'
import GameStats from './components/GameStats.vue'
import PuzzleBoard from './components/PuzzleBoard.vue'
import ReferencePanel from './components/ReferencePanel.vue'
import { usePuzzleGame } from './usePuzzleGame'

const router = useRouter()
const jigsawStore = useJigsawStore()

const splitSize = computed(() => jigsawStore.gameOptions.splitSize)
const imageUrl = computed(() => jigsawStore.gameOptions.imgUrl)

const {
  pieces,
  selectedIndex,
  moves,
  isCompleted,
  formattedTime,
  progress,
  startGame,
  selectPiece,
} = usePuzzleGame({ splitSize })

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
</script>

<template>
  <section v-if="imageUrl" class="game-shell">
    <GameHeader
      :split-size="splitSize"
      @settings="returnToOptions"
      @restart="startGame"
    />

    <div class="game-layout">
      <div class="board-column">
        <GameStats
          :formatted-time="formattedTime"
          :moves="moves"
          :progress="progress"
        />
        <PuzzleBoard
          :pieces="pieces"
          :split-size="splitSize"
          :image-url="imageUrl"
          :selected-index="selectedIndex"
          :is-completed="isCompleted"
          :formatted-time="formattedTime"
          :moves="moves"
          @select="selectPiece"
          @restart="startGame"
        />
      </div>

      <ReferencePanel :image-url="imageUrl" />
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

@media (max-width: 800px) {
  .game-layout {
    grid-template-columns: 1fr;
  }
}
</style>
