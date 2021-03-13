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

<script lang="ts">
  import slugify from 'slugify';
  export let id: string;

  const normalizedId = slugify(id);
  const href = `#${normalizedId}`;
</script>

<article class="paper border border-primary" id={normalizedId}>
  <a class="anchor" {href}>#</a>
  <heading>
    <slot name="heading" />
  </heading>
  <slot />
</article>
