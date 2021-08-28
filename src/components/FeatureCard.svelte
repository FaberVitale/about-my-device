<script lang="ts">
  import { kebabCase } from 'lodash-es';

  export let id: string;

  const normalizedId = kebabCase(id);
  const href = `#${normalizedId}`;
</script>

<article class="paper border border-primary" id={normalizedId}>
  <a class="anchor" {href}>#</a>
  <heading>
    <slot name="heading" {normalizedId} />
  </heading>
  <slot />
</article>

<style lang="scss">
  article {
    margin-bottom: 1.5rem;
    overflow-x: hidden;
    position: relative;
  }

  .anchor {
    position: absolute;
    top: 6px;
    right: 16px;
    outline: none;
    color: var(--primary);

    &:active {
      color: var(--secondary);
    }

    &:not(:active) {
      background: none;
    }
  }

  heading {
    display: flex;
    align-items: baseline;

    & > *:first-child {
      margin-right: 0.3rem;
    }
  }
</style>
