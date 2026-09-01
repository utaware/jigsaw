<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="mx-auto flex min-h-svh flex-col items-start gap-6 px-6 py-6">
    <!-- 创建选项表单组件 -->
    <RouterView />
  </main>
</template>
