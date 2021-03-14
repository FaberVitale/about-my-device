<style lang="scss">
  code {
    color: var(--primary);
    font-size: 0.8rem;
  }

  ul {
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 0.2rem;
    padding-left: 1rem;
  }

  section {
    padding: 0.4rem 0;
  }
</style>

<script type="ts" context="module">
  const navitationTypeMapping: Record<number | string, string> = {
    '0': 'TYPE_NAVIGATE(0)',
    '1': 'TYPE_RELOAD(1)',
    '2': 'TYPE_BACK_FORWARD(2)',
    '255': 'RESERVED(255)',
  };
</script>

<script type="ts">
  import { onMount } from 'svelte';
  import { deferred } from '@/utils/deferred';
  import type { Deferred } from '@/utils/deferred';
  import FeatureCard from './FeatureCard.svelte';
  import { useFirstRender } from '@/utils/useFirstRender';

  const navigationTypeUsingPerformanceNavigationApi: Deferred<number> = deferred();
  const navigationTypeUsingPerformanceNavigationTiming: Deferred<string> = deferred();
  const firstRender = useFirstRender();

  let historyLen = 0;

  onMount(() => {
    const updateHistoryLen = () => {
      historyLen = history.length;
    };

    updateHistoryLen();

    window.addEventListener('hashchange', updateHistoryLen);

    return () => {
      window.removeEventListener('hashchange', updateHistoryLen);
    };
  });

  onMount(() => {
    const navigationType = window.performance?.navigation?.type;
    if (typeof navigationType === 'number') {
      navigationTypeUsingPerformanceNavigationApi.resolve(navigationType);
    } else {
      navigationTypeUsingPerformanceNavigationApi.reject(
        new Error('window.performance.navigation is not supported'),
      );
    }

    type PerformanceNavigationEntryWithType = PerformanceEntry & {
      type?: string;
    };

    const performanceTimingNavigationType:
      | string
      | undefined = (window.performance?.getEntriesByType(
      'navigation',
    )?.[0] as PerformanceNavigationEntryWithType).type;

    if (typeof performanceTimingNavigationType === 'string') {
      navigationTypeUsingPerformanceNavigationTiming.resolve(
        performanceTimingNavigationType,
      );
    } else {
      navigationTypeUsingPerformanceNavigationTiming.reject(
        new Error('PerformanceNavigationTiming.type is not supported'),
      );
    }
  });
</script>

<FeatureCard id="navigation">
  <h3 slot="heading">Navigation</h3>
  <section>
    <h4>Type</h4>
    <ul>
      <li>
        {#await navigationTypeUsingPerformanceNavigationApi then navigationType}
          <code
            >{`navigation.type: ${navitationTypeMapping[navigationType]}`}</code>

          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigation"
            >MDN page</a>
        {:catch probingError}
          {probingError ? probingError.message : ''}
        {/await}
      </li>
      <li>
        {#await navigationTypeUsingPerformanceNavigationTiming then navigationType}
          <code>{`navigationEntry.type: ${navigationType}`}</code>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/type"
            >MDN page</a>
        {:catch probingError}
          {probingError ? probingError.message : ''}
        {/await}
      </li>
    </ul>
  </section>
  <section>
    <h4>History</h4>
    <p>stack size {historyLen}</p>
    <p>host <code>{$firstRender ? '' : location.host}</code></p>
  </section>
</FeatureCard>
