<script lang="ts">
  import FeatureCard from '$components/FeatureCard.svelte';
  import { onMount } from 'svelte';

  let colorScheme = '';
  let reduceMotion = '';
  let supportsHover = '';

  onMount(() => {
    function updateColorScheme({ matches }: MediaQueryList | MediaQueryListEvent) {
      colorScheme = matches ? 'dark' : 'light';
    }

    function updateReduceMotion({ matches }: MediaQueryList | MediaQueryListEvent) {
      reduceMotion = matches ? 'prefers reduced motion' : 'no preference';
    }

    function updateHover({ matches }: MediaQueryList | MediaQueryListEvent) {
      supportsHover = matches ? 'true' : 'false';
    }

    const preferredColorSchemeMq = window.matchMedia('(prefers-color-scheme: dark)');

    const reductionMotionMq = window.matchMedia('(prefers-reduced-motion)');

    const supportsHoverMq = window.matchMedia('(hover: hover)');

    updateColorScheme(preferredColorSchemeMq);
    updateReduceMotion(reductionMotionMq);
    updateHover(supportsHoverMq);

    supportsHoverMq.addListener(updateHover);
    preferredColorSchemeMq.addListener(updateColorScheme);
    reductionMotionMq.addListener(updateReduceMotion);

    return () => {
      preferredColorSchemeMq.removeListener(updateColorScheme);
      reductionMotionMq.removeListener(updateReduceMotion);
      supportsHoverMq.removeListener(updateHover);
    };
  });
</script>

<FeatureCard id="media-queries">
  <h3 slot="heading">Media queries</h3>
  <p>Preferred color scheme {colorScheme}</p>
  <p>Reduced motion {reduceMotion}</p>
  <p>
    Device input mechanism
    {supportsHover ? 'supports hover' : 'does not support hover'}
  </p>
  <p>Pointer mechanism <span class="pointer" /></p>
  <p class="media-type" />
</FeatureCard>

<style lang="scss">
  .pointer::before {
    content: 'none';
  }

  @media (pointer: coarse) {
    .pointer::before {
      content: 'limited accuracy';
    }
  }

  @media (pointer: fine) {
    .pointer::before {
      content: 'accurate';
    }
  }

  .media-type::before {
    font-weight: 500;
  }

  @media screen {
    .media-type::before {
      content: 'Media type is screen';
    }
  }

  @media print {
    .media-type::before {
      content: 'Media type is print';
    }
  }

  @media speech {
    .media-type::before {
      content: 'Media type is speech synthesizers';
    }
  }
</style>
