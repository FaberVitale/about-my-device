<script lang="ts">
  import { onMount } from 'svelte';
  import FeatureCard from '$components/FeatureCard.svelte';
  import Strong from '$components/Strong.svelte';

  let screen: Screen | null = null;
  let devicePixelRatio = '';
  $: screenDimensions = screen ? `${screen.width}x${screen.height} css pixels` : '';

  onMount(() => {
    const mqString = `(resolution: ${window.devicePixelRatio}dppx)`;
    const mediaQuery = matchMedia(mqString);
    screen = window.screen;

    const updatePixelRatio = () => {
      let pr = window.devicePixelRatio;
      let prString = (pr * 100).toFixed(0);
      devicePixelRatio = `${prString}% (${pr.toFixed(2)})`;
    };

    updatePixelRatio();

    mediaQuery.addListener(updatePixelRatio);

    return () => {
      mediaQuery.removeListener(updatePixelRatio);
    };
  });
</script>

<FeatureCard id="screen">
  <h3 slot="heading">Screen</h3>
  <p>
    Screen size is
    <Strong>{screenDimensions}</Strong>
  </p>
  <p>
    The device pixel ratio (physical/css pixels) is
    <Strong>{devicePixelRatio}</Strong>
  </p>
</FeatureCard>
