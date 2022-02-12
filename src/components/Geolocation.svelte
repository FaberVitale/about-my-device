<script lang="ts">
  import { onMount } from 'svelte';
  import FeatureCard from '$components/FeatureCard.svelte';
  import Strong from '$components/Strong.svelte';
  import { getDefaultTimezone } from '$utils/i18n';
  import {
    supportsGeolocation,
    getCurrentPos,
    GeolocationPositionErrorCodes,
    requestReverseGeocoding,
  } from '$utils/geolocation';
  import type { ReverseGeocoding } from '$utils/geolocation';

  let mounted = false;
  let defaultTimeZone: string | null = null;
  let hasGeo = false;

  $: {
    if (mounted) {
      defaultTimeZone = getDefaultTimezone();
      hasGeo = supportsGeolocation();
    }
  }

  let currentPos: Promise<GeolocationPosition> | undefined;
  let resolvedLocation: Promise<ReverseGeocoding> | undefined;

  function handleGetPosClick() {
    currentPos = getCurrentPos();

    currentPos.then((geoPos) => {
      resolvedLocation = requestReverseGeocoding(geoPos.coords);
    });

    currentPos.catch((...args) => {
      console.error('[geolocation][currentPos]', ...args);
    });
  }

  function getGeolocationErrorMessage(geoError: unknown): string {
    if (geoError instanceof GeolocationPositionError) {
      if (geoError.code === GeolocationPositionErrorCodes.PERMISSION_DENIED) {
        return `You need to accept the geolocation prompt to get your position or check that your device has geolocation activated.`;
      }
    }

    return `Your browser couldn't retrieve your position`;
  }

  onMount(() => {
    mounted = true;
  });
</script>

<FeatureCard id="geolocation">
  <h3 slot="heading">Geolocation</h3>
  <p>
    Time zone
    <Strong>{defaultTimeZone || ''}</Strong>
  </p>
  {#if hasGeo}
    <button type="button" on:click={handleGetPosClick}>Get position</button>
  {/if}
  {#if currentPos}
    <div>
      {#await currentPos then geoPos}
        <section class="coord-section">
          <h4>Geo coordinates</h4>
          <ul class="coord-wrapper">
            <li>{`latitude: ${geoPos.coords.latitude}`}</li>
            <li>{`longitude: ${geoPos.coords.longitude}`}</li>
          </ul>
        </section>
      {:catch geoErr}
        <p>{getGeolocationErrorMessage(geoErr)}</p>
      {/await}
      {#if resolvedLocation}
        {#await resolvedLocation then reverseGeo}
          <section class="geo-table">
            <h4>Address infos</h4>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>type</th>
                  <th>value</th>
                </tr>
              </thead>
              <tbody>
                {#each Object.entries(reverseGeo.address) as adressEntry, index}
                  <tr>
                    <td>{index + 1}</td>
                    <td>{adressEntry[0]}</td>
                    <td>{adressEntry[1]}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </section>
        {/await}
      {/if}
    </div>
  {/if}
</FeatureCard>

<style lang="scss">
  .geo-table {
    padding: 0.5rem 0;
    max-width: 100%;
    overflow-x: auto;
    font-size: 0.8rem;
    overflow-wrap: break-word;
  }

  .coord-wrapper {
    padding: 0.2rem 0;
  }

  .coord-section {
    max-width: 100%;
    overflow-x: auto;
    overflow-wrap: break-word;
    padding: 0.5rem 0;
  }
</style>
