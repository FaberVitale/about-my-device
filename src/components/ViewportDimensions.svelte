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
</style>

<script lang="ts">
  import Strong from '@/components/Strong.svelte';
  import FeatureCard from '@/components/FeatureCard.svelte';
  import { onMount } from 'svelte';

  let width: number = 0;
  let height: number = 0;
  let orientation: string = '';

  let inputText: HTMLInputElement | null = null;
  let inputNumeric: HTMLInputElement | null = null;

  onMount(() => {
    const handleSizeChange = () => {
      width = document.documentElement.clientWidth;
      height = document.documentElement.clientHeight;
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
    Viewport size is
    <Strong>{width || ' '} x {height || ' '} css pixels</Strong>
  </p>
  <p>
    Viewport orietation is
    <Strong>{orientation}</Strong>
  </p>
  <p>
    Bootstrap 4 breakpoint
    <Strong><span class="breakpoint"></span></Strong>
  </p>
</FeatureCard>
