<script lang="ts">
  import FeatureCard from './FeatureCard.svelte';

  let inputNumeric: HTMLInputElement | null = null;
  let inputText: HTMLInputElement | null = null;
</script>

<FeatureCard id="virtual-keyboard">
  <h3 slot="heading">Virtual keyboard</h3>

  <p class="virtual-alert">It might not be available on your device.</p>

  <button type="button" on:click={() => inputText && inputText.focus()}> text keyboard </button>
  <button type="button" on:click={() => inputNumeric && inputNumeric.focus()}>
    numeric keyboard
  </button>
  <form class="hidden-form" aria-label="floating keyboard sample form" on:submit|preventDefault>
    <input bind:this={inputText} type="text" name="text-input" />
    <input
      bind:this={inputNumeric}
      inputmode="numeric"
      type="text"
      pattern="[0-9]*"
      name="numeric-input"
    />
  </form>
</FeatureCard>

<style lang="scss">
  .hidden-form {
    opacity: 0.01;
    height: 1px;
    overflow: hidden;
  }

  h3 {
    padding-bottom: 1rem;
  }

  .virtual-alert {
    display: block;
    font-size: 0.8rem;
  }
</style>
