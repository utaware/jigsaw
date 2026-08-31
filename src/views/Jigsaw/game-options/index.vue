<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useJigsawStore } from '@/stores/jigsaw'

import OptionsImageUrl from './components/OptionsImageUrl/index.vue'
import OptionsSplitSize from './components/OptionsSplitSize/index.vue'
import OptionsFooter from './components/OptionsFooter/index.vue'

const router = useRouter()
const jigsawStore = useJigsawStore()

// Determine if the game can be started based on the current game options
const canStartGame = computed(() => {
  const { imgUrl, splitSize } = jigsawStore.gameOptions
  return imgUrl !== '' && splitSize > 0
})

// Handle the change of the image URL
const handleImageChange = (url: string) => {
  jigsawStore.gameOptions.imgUrl = url
}

// Handle the start of the game
const handleStartGame = () => {
  router.push({ name: 'game-jigsaw-play' })
}
</script>

<template>
  <OptionsImageUrl @cropped="handleImageChange" />
  <OptionsSplitSize v-model="jigsawStore.gameOptions.splitSize" />
  <OptionsFooter :can-start-game="canStartGame" @enter="handleStartGame" />
</template>

<style scoped></style>
