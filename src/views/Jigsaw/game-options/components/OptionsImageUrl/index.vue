<script setup lang="ts">
import { ref, reactive } from 'vue'
import { VueCropper } from 'vue-cropper'
import 'vue-cropper/dist/index.css'

import ImageUploadAction from './action.vue'
import ImageUploadView from './view.vue'

interface CropperInstance {
  getCropData: (callback: (dataUrl: string) => void) => void
  rotateLeft: () => void
  rotateRight: () => void
  rotateClear: () => void
}
// 裁剪配置
const cropOptions = reactive({
  size: 360,
  rotate: 0,
})

const emit = defineEmits<{
  cropped: [dataUrl: string]
}>()

const jigsawUrl = ref<string>('')
const jigsawFile = ref<File | null>(null)

const croppedImageDataUrl = ref<string>('')
const cropperRef = ref<CropperInstance | null>(null)

// 处理图片选择事件
function handleImageSelected(dataUrl: string, file: File) {
  jigsawUrl.value = dataUrl
  jigsawFile.value = file
}

// 处理图片裁剪事件
function handleImageCropped() {
  cropperRef.value?.getCropData(dataUrl => {
    croppedImageDataUrl.value = dataUrl
    emit('cropped', dataUrl)
  })
}

// 处理图片重置事件
function handleImageReset() {
  jigsawUrl.value = ''
  jigsawFile.value = null
  croppedImageDataUrl.value = ''
}

// 处理图片旋转事件
function handleImageRotate(direction: 'L' | 'R') {
  if (direction === 'L') {
    cropperRef.value?.rotateLeft()
    cropOptions.rotate = (cropOptions.rotate - 90 + 360) % 360
  } else {
    cropperRef.value?.rotateRight()
    cropOptions.rotate = (cropOptions.rotate + 90) % 360
  }
}
</script>

<template>
  <section class="w-full flex flex-col gap-6">
    <div
      class="flex min-h-90 w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center"
    >
      <!-- 图片裁剪区域 -->
      <div v-if="jigsawUrl" class="h-90 w-full overflow-hidden rounded-md">
        <VueCropper
          mode="contain"
          output-type="png"
          ref="cropperRef"
          :img="jigsawUrl"
          :output-size="1"
          :info="true"
          :can-scale="true"
          :auto-crop="true"
          :auto-crop-width="cropOptions.size"
          :auto-crop-height="cropOptions.size"
          :fixed="true"
          :fixed-number="[1, 1]"
          :fixed-box="true"
          :center-box="true"
          :high="false"
          :default-rotate="cropOptions.rotate"
        />
      </div>
      <!-- 未上传图片提示区域 -->
      <div v-else class="h-90 w-full flex flex-col items-center justify-center">
        <p class="text-sm font-medium text-foreground">还没有上传图片</p>
        <p class="text-sm text-muted-foreground">
          选择一张本地图片后，会直接以 dataUrl 展示在这里。
        </p>
      </div>
    </div>
    <!-- 图片上传与裁剪操作区域 -->
    <ImageUploadAction
      :jigsaw-url="jigsawUrl"
      @cropped="handleImageCropped"
      @selected="handleImageSelected"
      @reset="handleImageReset"
      @rotate="handleImageRotate"
    />
    <!-- 裁剪结果展示区域 -->
    <ImageUploadView
      :cropped-image-data-url="croppedImageDataUrl"
      :size="cropOptions.size"
    />
  </section>
</template>

<style scoped></style>
