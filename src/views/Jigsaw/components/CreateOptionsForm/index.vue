<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { useJigsawStore } from '@/stores/jigsaw'

import ImageUpload from './ImageUpload/index.vue'
import ImageSplitSize from './ImageSplitSize/index.vue'
import FormFooter from './FormFooter/index.vue'

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
  <ImageUpload @cropped="handleImageChange" />
  <ImageSplitSize v-model="jigsawStore.gameOptions.splitSize" />
  <FormFooter :can-start-game="canStartGame" @enter="handleStartGame" />
</template>

<style scoped></style>
