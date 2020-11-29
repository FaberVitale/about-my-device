<script lang="ts">
  import { onMount } from 'svelte';

  let toggle = false;

  let mounted = false;

  $: {
    if (__BROWSER__ && mounted) {
      if (toggle) {
        window.document.documentElement.classList.add('dark');
      } else {
        window.document.documentElement.classList.remove('dark');
      }
    }
  }

  onMount(() => {
    mounted = true;
    toggle = window.document.documentElement.classList.contains('dark');
  });
</script>

{#if mounted}
  <form>
    <fieldset class="form-group">
      <label for="dark-mode-switcher" class="paper-switch-2-label">
        Dark mode
      </label>
      <label class="paper-switch-2">
        <input
          id="dark-mode-switcher"
          name="dark-mode-switcher"
          type="checkbox"
          bind:checked="{toggle}"
        />
        <span class="paper-switch-slider round"></span>
      </label>
    </fieldset>
  </form>
{/if}
