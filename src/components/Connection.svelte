<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import FeatureCard from './FeatureCard.svelte';
  import Strong from './Strong.svelte';

  let isOnline: boolean = false;
  let effectiveType: string = '';
  let downlink: string = '';
  let ipRequest: Promise<string> | null = null;

  const requestIp = () => {
    ipRequest = fetch('https://icanhazip.com/')
      .catch(() => fetch('https://api6.ipify.org/'))
      .then((res) => res.text());
  };

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
  {#if isOnline}
    <button type="button" on:click="{requestIp}">Show IP</button>
  {/if}
  {#if ipRequest}
    {#await ipRequest then ip}
      <code class="badge" in:fade>{ip}</code>
    {:catch}
      <span>Couldn't fetch ip. Wanna retry?</span>
    {/await}
  {/if}
</FeatureCard>
