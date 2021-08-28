import { onMount } from 'svelte';
import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';

export function useFirstRender(): Readable<boolean> {
  let initialValue = true;
  let setIsFirstRender: null | ((value: boolean) => void) = null;

  const firstRender = readable(initialValue, (set) => {
    setIsFirstRender = set;
  });

  onMount(() => {
    initialValue = false;
    setIsFirstRender && setIsFirstRender(false);
  });

  return firstRender;
}
