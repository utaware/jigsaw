<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

import { cn } from '@/lib/utils'

type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

const props = withDefaults(
  defineProps<{
    /** 要渲染的 HTML 文本标签。 */
    tag?: TypographyTag
    /** 允许通过 class 对单个文本实例进行样式补充。 */
    class?: HTMLAttributes['class']
  }>(),
  {
    tag: 'p',
  },
)
</script>

<template>
  <component :is="props.tag" :class="cn('typography', props.class)">
    <slot />
  </component>
</template>

<style scoped lang="scss">
.typography {
  margin: 0;
  color: var(--foreground);
  font-family: inherit;
  letter-spacing: 0;
  text-wrap: pretty;
}

h1.typography {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 750;
  line-height: 1.1;
}

h2.typography {
  font-size: clamp(1.6rem, 4vw, 2.25rem);
  font-weight: 700;
  line-height: 1.15;
}

h3.typography {
  font-size: clamp(1.35rem, 3vw, 1.75rem);
  font-weight: 700;
  line-height: 1.2;
}

h4.typography {
  font-size: 1.25rem;
  font-weight: 650;
  line-height: 1.3;
}

h5.typography {
  font-size: 1.1rem;
  font-weight: 650;
  line-height: 1.35;
}

h6.typography {
  font-size: 1rem;
  font-weight: 650;
  line-height: 1.4;
}

p.typography {
  color: var(--foreground);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
}

span.typography {
  display: inline;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
}
</style>
