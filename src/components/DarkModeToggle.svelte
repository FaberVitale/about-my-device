<style lang="scss">
  @import 'src/styles/_mixins.scss';

  .label-text {
    @include sr-only();
  }
  .icon {
    width: 24px;
    height: 24px;
    color: var(--primary);
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte';
  import { setStorageItem } from 'storage-helpers';

  let toggle = false;
  let mounted = false;

  $: {
    if (__BROWSER__ && mounted) {
      if (toggle) {
        window.document.documentElement.classList.add('dark');
        setStorageItem('color-scheme', 'dark');
      } else {
        window.document.documentElement.classList.remove('dark');
        setStorageItem('color-scheme', 'light');
      }
    }
  }

  onMount(() => {
    mounted = true;
    toggle = window.document.documentElement.classList.contains('dark');
  });
</script>

{#if mounted}
  <form on:submit|preventDefault>
    <fieldset class="form-group">
      <label for="dark-mode-switcher" class="paper-switch-2-label">
        <span class="label-text">Toggle Dark theme</span>
        <div class="icon">
          <svg
            class="sun"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round">
            {#if toggle}
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            {:else}
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            {/if}
          </svg>
        </div>
      </label>
      <label class="paper-switch-2">
        <input
          id="dark-mode-switcher"
          name="dark-mode-switcher"
          type="checkbox"
          bind:checked={toggle} />
        <span class="paper-switch-slider round" />
      </label>
    </fieldset>
  </form>
{/if}
