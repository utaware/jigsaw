<script setup lang="ts">
import { ref } from 'vue'
import { VueCropper } from 'vue-cropper'
import 'vue-cropper/dist/index.css'

import { Button } from '@/components/ui/button'
import { Crop, ImageUp } from 'lucide-vue-next'

interface CropperInstance {
  getCropData: (callback: (dataUrl: string) => void) => void
}

const emit = defineEmits<{
  cropped: [dataUrl: string]
}>()

const imageDataUrl = ref<string>('')
const croppedImageDataUrl = ref<string>('')
const imageName = ref<string>('')
const cropperRef = ref<CropperInstance | null>(null)

function handleImageChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    imageDataUrl.value = String(reader.result ?? '')
    croppedImageDataUrl.value = ''
    imageName.value = file.name
    input.value = ''
  }

  reader.readAsDataURL(file)
}

function cropImage() {
  cropperRef.value?.getCropData(dataUrl => {
    croppedImageDataUrl.value = dataUrl
    emit('cropped', dataUrl)
  })
}
</script>

<template>
  <section class="w-full space-y-4">
    <div
      class="flex min-h-72 w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center"
    >
      <div v-if="imageDataUrl" class="h-96 w-full overflow-hidden rounded-md">
        <VueCropper
          ref="cropperRef"
          :img="imageDataUrl"
          :output-size="1"
          output-type="png"
          :info="true"
          :can-scale="true"
          :auto-crop="true"
          :auto-crop-width="240"
          :auto-crop-height="240"
          :fixed="true"
          :fixed-number="[1, 1]"
          :fixed-box="true"
          :center-box="true"
          :high="false"
        />
      </div>
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
        {{ imageDataUrl ? '更换图片' : '上传图片' }}
      </Button>
      <Button v-if="imageDataUrl" type="button" @click="cropImage">
        <Crop />
        确认裁剪
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

    <div v-if="croppedImageDataUrl" class="space-y-2">
      <p class="text-sm font-medium text-foreground">裁剪结果（240 × 240）</p>
      <img
        :src="croppedImageDataUrl"
        alt="240 × 240 裁剪结果"
        width="240"
        height="240"
        class="rounded-md border border-border object-cover"
      />
    </div>
  </section>
</template>

<style scoped></style>
