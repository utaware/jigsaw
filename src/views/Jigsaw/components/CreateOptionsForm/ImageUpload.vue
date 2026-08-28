<script setup lang="ts">
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { ImageUp } from 'lucide-vue-next'

const imageDataUrl = ref<string>('')
const imageName = ref<string>('')

function handleImageChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    imageDataUrl.value = String(reader.result ?? '')
    imageName.value = file.name
  }

  reader.readAsDataURL(file)
}
</script>

<template>
  <section class="w-full space-y-4" @click="handleImageChange">
    <div
      class="flex min-h-72 w-full flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center"
    >
      <img
        v-if="imageDataUrl"
        :src="imageDataUrl"
        :alt="imageName || '上传的图片'"
        class="max-h-112 w-full rounded-md object-contain"
      />
      <div v-else class="space-y-2">
        <p class="text-sm font-medium text-foreground">还没有上传图片</p>
        <p class="text-sm text-muted-foreground">
          选择一张本地图片后，会直接以 dataUrl 展示在这里。
        </p>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <Button as="label" for="jigsaw-image-upload" type="button">
        <ImageUp />
        上传图片
      </Button>
      <span v-if="imageName" class="text-sm text-muted-foreground">
        {{ imageName }}
      </span>
      <input
        id="jigsaw-image-upload"
        type="file"
        accept="image/*"
        class="sr-only"
        @change="handleImageChange"
      />
    </div>
  </section>
</template>

<style scoped></style>
