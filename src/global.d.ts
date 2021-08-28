/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

declare type HTMLElementEvent<
  T extends HTMLElement = HTMLElement,
  U extends HTMLElement = HTMLElement
> = Event & {
  target: T & EventTarget;
  currentTarget: U & EventTarget;
};

declare type DomEventHandler<E, H> = svelte.JSX.EventHandler<E, H>;
