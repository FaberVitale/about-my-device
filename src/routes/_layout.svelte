<style global lang="scss">
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
</style>

<script lang="ts">
  import Footer from '@/components/Footer.svelte';
</script>

<main class="main">
  <slot />
  <Footer />
</main>
