<style global lang="scss">
  $safe-area-inset-list: 'safe-area-inset-top', 'safe-area-inset-right',
    'safe-area-inset-bottom', 'safe-area-inset-left';
  .main {
    position: relative;
    max-width: 56em;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }

  body {
    background-color: var(--main-background);
    transition: background-color 200ms linear;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  :root {
    @each $elem in $safe-area-inset-list {
      --#{$elem}: env(#{$elem}, 0px);
    }
  }
</style>

<script lang="ts">
  import Footer from '@/components/Footer.svelte';
  import { useRestoreAnchorPosition } from '@/utils/routing';

  useRestoreAnchorPosition();
</script>

<main class="main">
  <slot />
  <Footer />
</main>
