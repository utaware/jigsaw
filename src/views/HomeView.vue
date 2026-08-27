<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Button } from '@/components/ui/button'
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
const { count } = storeToRefs(counter)
</script>

<template>
  <main class="mx-auto flex min-h-svh max-w-3xl flex-col items-start justify-center gap-6 px-6 py-16">
    <div class="space-y-3">
      <p class="text-sm font-medium text-muted-foreground">Vue Router + Pinia + shadcn-vue</p>
      <h1 class="text-4xl font-semibold tracking-tight text-foreground">项目基础能力已接入</h1>
      <p class="max-w-xl text-muted-foreground">
        当前页面由 Vue Router 渲染，计数状态来自 Pinia，按钮样式来自 shadcn-vue。
      </p>
    </div>

    <Button type="button" @click="counter.increment()">count is {{ count }}</Button>
  </main>
</template>