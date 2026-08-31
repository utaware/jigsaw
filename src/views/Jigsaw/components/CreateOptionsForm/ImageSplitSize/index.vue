<script setup lang="ts">
const splitOptions = [
  { icon: '🌱', text: '简单', size: 3 },
  { icon: '🌿', text: '中等', size: 4 },
  { icon: '🍃', text: '困难', size: 5 },
  { icon: '🌳', text: '专家', size: 6 },
]
</script>

<template>
  <section class="image-split">
    <div class="section-heading">
      <h2>选择拼图难度</h2>
    </div>

    <div class="option-grid">
      <button
        v-for="option in splitOptions"
        :key="option.text"
        type="button"
        class="option-card flex flex-col"
      >
        <span class="icon">{{ option.icon }}</span>
        <span class="content">
          <span class="text">{{ option.text }}</span>
          <span class="meta">{{ option.size }} x {{ option.size }}</span>
        </span>
      </button>
    </div>
  </section>
</template>

<style scoped lang="scss">
.image-split {
  width: 100%;
  display: grid;
  gap: 1rem;

  .section-heading {
    display: grid;
    gap: 0.25rem;
  }

  .eyebrow {
    margin: 0;
    color: var(--muted-foreground);
    font-size: 0.78rem;
    font-weight: 600;
  }

  h2 {
    margin: 0;
    color: var(--foreground);
    font-size: 1.25rem;
    font-weight: 650;
  }

  .option-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
  }

  .option-card {
    min-height: 5.75rem;
    align-items: center;
    gap: 0.875rem;
    padding: 1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background:
      linear-gradient(
        145deg,
        var(--card) 0%,
        color-mix(in oklch, var(--muted) 45%, transparent) 100%
      ),
      var(--card);
    color: var(--foreground);
    text-align: left;
    transition:
      border-color 160ms ease,
      box-shadow 160ms ease,
      transform 160ms ease,
      background 160ms ease;

    &:hover {
      border-color: var(--ring);
      box-shadow: 0 10px 26px
        color-mix(in oklch, var(--foreground) 8%, transparent);
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 2px solid var(--ring);
      outline-offset: 2px;
    }
  }

  .icon {
    width: 2.75rem;
    height: 2.75rem;
    display: inline-grid;
    place-items: center;
    flex: 0 0 auto;
    border-radius: calc(var(--radius) - 2px);
    background: var(--accent);
    font-size: 1.45rem;
  }

  .content {
    min-width: 0;
    display: grid;
    gap: 0.25rem;
  }

  .text {
    font-size: 0.95rem;
    font-weight: 650;
  }

  .meta {
    color: var(--muted-foreground);
    font-size: 0.82rem;
  }

  @media (max-width: 520px) {
    .option-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
