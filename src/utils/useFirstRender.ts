import { onMount } from 'svelte';
import { readable } from 'svelte/store';

export function useFirstRender() {
  let initialValue = true;
  let setIsFirstRender: null | ((value: boolean) => void) = null;

  let firstRender = readable(initialValue, (set) => {
    setIsFirstRender = set;
  });

  onMount(() => {
    initialValue = false;
    setIsFirstRender?.(false);
  });

  return firstRender;
}
