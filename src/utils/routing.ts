import { onMount } from 'svelte';

export function useRestoreAnchorPosition() {
  onMount(() => {
    const fragment = window.location.hash;

    const selectedId = fragment.slice(1);

    if (selectedId) {
      const activeAnchor = document.getElementById(selectedId);

      if (activeAnchor) {
        window.scrollTo(
          0,
          activeAnchor.getBoundingClientRect().top + window.scrollY,
        );
      }
    }
  });
}
