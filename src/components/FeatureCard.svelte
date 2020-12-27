<style lang="scss">
  article {
    margin-bottom: 1.5rem;
    overflow-x: hidden;
  }
</style>

<script lang="ts">
  export let id: string;
</script>

<article class="paper border border-primary" id="{id}">
  <heading>
    <slot name="heading" />
  </heading>
  <slot />
</article>
