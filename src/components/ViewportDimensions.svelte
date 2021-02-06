<style lang="scss">
  .breakpoint::before {
    content: 'xs';
    text-transform: uppercase;
    font-weight: 900;
  }

  @media (min-width: 576px) {
    .breakpoint::before {
      content: 'sm';
    }
  }

  @media (min-width: 768px) {
    .breakpoint::before {
      content: 'md';
    }
  }

  @media (min-width: 992px) {
    .breakpoint::before {
      content: 'lg';
    }
  }

  @media (min-width: 1200px) {
    .breakpoint::before {
      content: 'xl';
    }
  }

  @media (min-width: 1400px) {
    .breakpoint::before {
      content: 'xxl';
    }
  }
</style>

<script lang="ts">
  import Strong from '@/components/Strong.svelte';
  import FeatureCard from '@/components/FeatureCard.svelte';
  import { onMount } from 'svelte';

  const positions = ['top', 'right', 'bottom', 'left'] as const;

  let innerWindowWidth: number = 0;
  let widthWithoutScrollbar: number = 0;
  let innerWindowHeight: number = 0;
  let heightWithoutScrollbar: number = 0;
  let orientation: string = '';

  let safeInset = {
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  };

  onMount(() => {
    const handleSizeChange = () => {
      innerWindowWidth = window.innerWidth;
      widthWithoutScrollbar = document.documentElement.clientWidth;
      innerWindowHeight = window.innerHeight;
      heightWithoutScrollbar = document.documentElement.clientHeight;

      const computedStyles = getComputedStyle(document.documentElement);

      safeInset = {
        top: computedStyles.getPropertyValue('--safe-area-inset-top'),
        right: computedStyles.getPropertyValue('--safe-area-inset-right'),
        bottom: computedStyles.getPropertyValue('--safe-area-inset-bottom'),
        left: computedStyles.getPropertyValue('--safe-area-inset-left'),
      };
    };

    const onOrientationChange = ({
      matches,
    }: MediaQueryListEvent | MediaQueryList) => {
      if (matches) {
        orientation = 'landscape';
      } else {
        orientation = 'portrait';
      }
    };
    const orientationMediaQuery = window.matchMedia('(orientation: landscape)');

    handleSizeChange();
    onOrientationChange(orientationMediaQuery);

    window.addEventListener('resize', handleSizeChange);
    orientationMediaQuery.addEventListener('change', onOrientationChange);

    return () => {
      window.removeEventListener('resize', handleSizeChange);
      orientationMediaQuery.removeEventListener('change', onOrientationChange);
    };
  });
</script>

<FeatureCard id="viewport">
  <h3 slot="heading">Viewport</h3>
  <p>
    size with scrollbars is
    <Strong>{innerWindowWidth || ' '} x {innerWindowHeight || ' '} px</Strong>
  </p>
  <p>
    size without scrollbars is
    <Strong>
      {widthWithoutScrollbar || ' '}
      x
      {heightWithoutScrollbar || ' '}
      px
    </Strong>
  </p>
  <p>
    orientation is
    <Strong>{orientation}</Strong>
  </p>
  <p>
    Bootstrap 5 breakpoint
    <Strong><span class="breakpoint"></span></Strong>
  </p>
  {#each positions as pos}
    <p>
      {`safe-area-inset-${pos}:`}
      <Strong>{safeInset[pos]}</Strong>
    </p>
  {/each}
</FeatureCard>
