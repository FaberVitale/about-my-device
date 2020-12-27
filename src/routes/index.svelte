<style>
  h1 {
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .darkModeToggle {
    position: absolute;
    z-index: 2;
    top: 0.5rem;
    right: 0.5rem;
  }
</style>

<script>
  import Screen from '@/components/Screen.svelte';
  import ViewportDimensions from '@/components/ViewportDimensions.svelte';
  import BrowserSettings from '@/components/BrowserSettings.svelte';
  import Connection from '@/components/Connection.svelte';
  import MediaQuery from '@/components/MediaQuery.svelte';
  import DarkModeToggle from '@/components/DarkModeToggle.svelte';
  import VirtualKeyboard from '@/components/VirtualKeyboard.svelte';
  import Geolocation from '@/components/Geolocation.svelte';
</script>

<svelte:head>
  <title>About my device</title>
</svelte:head>
<h1>About my device</h1>

<div class="darkModeToggle">
  <DarkModeToggle />
</div>
<ViewportDimensions />
<VirtualKeyboard />
<Screen />
<Geolocation />
<Connection />
<BrowserSettings />
<MediaQuery />
