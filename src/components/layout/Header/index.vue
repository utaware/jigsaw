<script setup lang="ts">
import { RouterLink } from 'vue-router'

import CommonLogo from '@/components/common/Logo/index.vue'
import ThemeSwitch from '@/components/layout/ThemeSwitch/index.vue'
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
    <div class="mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
      <div class="flex items-center gap-6">
        <!-- 左侧：标题与主页链接 -->
        <CommonLogo />
        <!-- 导航项（可选） -->
        <nav class="flex items-center gap-4 text-sm font-medium">
          <RouterLink
            to="/"
            class="text-muted-foreground transition-colors hover:text-foreground"
            active-class="!text-foreground font-semibold"
          >
            首页
          </RouterLink>
          <RouterLink
            to="/jigsaw"
            class="text-muted-foreground transition-colors hover:text-foreground"
            active-class="!text-foreground font-semibold"
          >
            拼图
          </RouterLink>
        </nav>
      </div>
      <!-- 右侧：主题切换按钮 -->
      <div class="flex items-center gap-2">
        <ThemeSwitch />
      </div>
    </div>
  </header>
</template>
