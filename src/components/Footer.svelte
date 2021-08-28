<footer>
  <ul>
    <li>
      Created by
      <a rel="noopener" target="_blank" href="https://github.com/FaberVitale">FaberVitale</a>
    </li>
    <li>
      Source is available on
      <a rel="noopener" target="_blank" href="https://github.com/FaberVitale/about-my-device"
        >github</a
      >
    </li>
    <li>
      Powered by
      <a rel="noopener" target="_blank" href="https://svelte.dev/">Svelte</a>
      and
      <a rel="noopener" target="_blank" href="https://www.getpapercss.com/"> PaperCss </a>
    </li>
  </ul>
</footer>

<style lang="scss">
  footer,
  ul {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
    margin: 0.1rem 0;
    font-size: 0.8rem;
    &::before {
      content: '';
    }
  }
</style>
