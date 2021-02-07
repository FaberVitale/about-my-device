/**
 * These declarations tell TypeScript that we allow import of images, e.g.
 * ```
		<script lang='ts'>
			import successkid from 'images/successkid.jpg';
		</script>

		<img src="{successkid}">
	 ```
 */
declare module '*.gif' {
  const value: string;
  export = value;
}

declare module '*.jpg' {
  const value: string;
  export = value;
}

declare module '*.jpeg' {
  const value: string;
  export = value;
}

declare module '*.png' {
  const value: string;
  export = value;
}

declare module '*.svg' {
  const value: string;
  export = value;
}

declare module '*.webp' {
  const value: string;
  export = value;
}

declare var __BROWSER__: boolean;

declare var __DEV__: boolean;

declare type HTMLElementEvent<
  T extends HTMLElement = HTMLElement,
  U extends HTMLElement = HTMLElement
> = Event & {
  target: T & EventTarget;
  currentTarget: U & EventTarget;
};

declare type DomEventHandler<E, H> = svelte.JSX.EventHandler<E, H>;
