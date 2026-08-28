<script setup lang="ts">
import { RouterLink } from 'vue-router'

import { AppLogoName } from '@/config/app'
</script>

<template>
    <RouterLink to="/"
        class="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-80">
        <span class="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {{ AppLogoName }}
        </span>
    </RouterLink>
</template>

<style scoped></style>