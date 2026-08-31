<script setup lang="ts">
import { Crop, ImageUp, BrushCleaning } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'

const emits = defineEmits<{
  selected: [dataUrl: string, file: File]
  cropped: []
  reset: []
  rotate: [direction: 'L' | 'R']
}>()

const props = defineProps<{
  jigsawUrl: string
}>()

// 处理图片选择事件
const handleImageSelected = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    const dataUrl = String(reader.result ?? '')
    input.value = ''
    emits('selected', dataUrl, file)
  }

  reader.readAsDataURL(file)
}

// 处理图片裁剪事件
const handleImageCropped = () => {
  emits('cropped')
}

// 处理图片重置事件
const handleImageReset = () => {
  emits('reset')
}

// 处理图片旋转事件
const handleImageRotate = (direction: 'L' | 'R') => {
  emits('rotate', direction)
}
</script>

<template>
  <!-- 图片上传与裁剪操作区域 -->
  <div class="flex flex-wrap items-center gap-3 justify-between">
    <!-- 上传与裁剪按钮 -->
    <Button class="min-w-30" as="label" for="jigsaw-image-upload" type="button">
      <ImageUp />
      {{ jigsawUrl ? '更换图片' : '上传图片' }}
    </Button>
    <!-- 旋转按钮 -->
    <ButtonGroup>
      <Button
        class="min-w-15"
        :disabled="!jigsawUrl"
        variant="outline"
        @click="handleImageRotate('L')"
      >
        L
      </Button>
      <Button
        class="min-w-15"
        :disabled="!jigsawUrl"
        variant="outline"
        @click="handleImageRotate('R')"
      >
        R
      </Button>
    </ButtonGroup>
    <!-- 重置按钮 -->
    <Button
      class="min-w-30"
      :disabled="!jigsawUrl"
      type="button"
      @click="handleImageReset"
    >
      <BrushCleaning />
      重置
    </Button>
    <!-- 确认裁剪按钮 -->
    <Button
      class="min-w-30"
      :disabled="!jigsawUrl"
      type="button"
      @click="handleImageCropped"
    >
      <Crop />
      确认裁剪
    </Button>
    <!-- 图片上传表单 -->
    <input
      id="jigsaw-image-upload"
      type="file"
      accept="image/*"
      class="sr-only"
      @change="handleImageSelected"
    />
  </div>
</template>

<style scoped></style>
