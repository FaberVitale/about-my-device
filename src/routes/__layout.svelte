<script lang="ts">
  import Footer from '$components/Footer.svelte';
  import '$styles/app.scss';
</script>

<main class="main">
  <slot />
  <Footer />
</main>
