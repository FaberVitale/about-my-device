<script lang="ts">
  import { onMount } from 'svelte';
  import FeatureCard from './FeatureCard.svelte';
  import Strong from './Strong.svelte';

  let isOnline: boolean = false;
  let effectiveType: string = '';
  let downlink: string = '';

  onMount(() => {
    function updateConnectionStatus() {
      isOnline = window.navigator.onLine;
      if ((window.navigator as any).connection) {
        const connection = (window.navigator as any).connection;
        effectiveType = connection?.effectiveType || '';
        downlink = connection?.downlink || '';
      }
    }

    updateConnectionStatus();

    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);

    return () => {
      window.removeEventListener('online', updateConnectionStatus);
      window.removeEventListener('offline', updateConnectionStatus);
    };
  });
</script>

<FeatureCard id="connection">
  <h3 slot="heading">Connection</h3>
  <p>
    Connection status
    <Strong>{isOnline ? 'online' : 'offline'}</Strong>
  </p>
  {#if effectiveType && isOnline}
    <p>Connection effective type <strong>{effectiveType}</strong></p>
  {/if}
  {#if downlink && isOnline}
    <p>Approximate download bandwidth <strong>{downlink}</strong></p>
  {/if}
</FeatureCard>
