<script lang="ts" context="module">
  export const elems = ['p', 'span'] as const;
</script>

<script lang="ts">
  export let as = 'p';
</script>

{#if as === 'p'}
  <p class="text">
    <slot />
  </p>
{:else}
  <span class="text"><slot /></span>
{/if}

<style lang="scss">
  .text {
    font-size: 0.8rem;
  }
</style>
