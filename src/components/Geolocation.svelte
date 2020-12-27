<style lang="scss">
  .geo-table {
    padding: 0.5rem 0;
  }

  .coord-wrapper {
    padding: 0.2rem 0;
    display: grid;
    grid-gap: 0.2rem;

    @media all and (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .coord-section {
    padding: 0.5rem 0;
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte';
  import FeatureCard from '@/components/FeatureCard.svelte';
  import Strong from '@/components/Strong.svelte';
  import { getDefaultTimezone } from '@/utils/i18n';
  import {
    supportsGeolocation,
    getCurrentPos,
    GeolocationPositionErrorCodes,
    requestReverseGeocoding,
  } from '@/utils/geolocation';
  import type { ReverseGeocoding } from '@/utils/geolocation';

  let mounted = false;
  let defaultTimeZone: string | null = null;
  let hasGeo: boolean = false;

  $: {
    if (mounted) {
      defaultTimeZone = getDefaultTimezone();
      hasGeo = supportsGeolocation();
    }
  }

  let currentPos: Promise<GeolocationPosition>;
  let resolvedLocation: Promise<ReverseGeocoding>;

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
        return `You need to accept the geolocation prompt to get your position`;
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
    <button type="button" on:click="{handleGetPosClick}">Get position</button>
  {/if}
  {#if currentPos}
    <div>
      {#await currentPos then geoPos}
        <section class="coord-section">
          <h4>Geo coordinates</h4>
          <div class="coord-wrapper">
            <Strong>{`latitude: ${geoPos.coords.latitude}`}</Strong>
            <Strong>{`longitude: ${geoPos.coords.longitude}`}</Strong>
          </div>
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
