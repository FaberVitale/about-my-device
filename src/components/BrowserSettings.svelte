<script lang="ts">
  import FeatureCard from '$components/FeatureCard.svelte';
  import Strong from '$components/Strong.svelte';
  import { onMount } from 'svelte';

  let locale = '';
  let preferredLanguages = '';
  let cookieEnabled = true;
  let doNotTrack = false;
  let deviceMemory = 0;
  let userAgent = '';

  onMount(() => {
    locale = window.navigator.language;
    preferredLanguages = window.navigator.languages.join(', ');
    cookieEnabled = window.navigator.cookieEnabled;
    deviceMemory = (window.navigator as any).deviceMemory;

    if (window.navigator.doNotTrack) {
      doNotTrack = !!+window.navigator.doNotTrack;
    }
    userAgent = window.navigator.userAgent;
  });
</script>

<FeatureCard id="browser">
  <h3 slot="heading">Browser</h3>
  <p>
    Language
    <strong>{locale}</strong>, preferred locales
    <strong>{preferredLanguages}</strong>
  </p>
  <p>Cookies <strong>{cookieEnabled ? 'enabled' : 'disabled'}</strong></p>
  <p>
    Do not track flag is set to
    <strong>{doNotTrack ? 'true' : 'false'}</strong>
  </p>
  {#if deviceMemory}
    <p>
      This device has at least
      <Strong>{deviceMemory}GB</Strong>
      of RAM.
    </p>
  {/if}
  {#if userAgent}
    <pre>User agent <code>{userAgent}</code></pre>
  {/if}
</FeatureCard>
