<script lang="ts">
  export let segment: string;
</script>

<style lang="scss">
  nav {
    display: flex;
  }

  ul {
    list-style: none;
    display: flex;
    justify-content: flex-end;
    flex: 1;
  }
</style>

<nav>
  <ul>
    <li>
      <a
        aria-current={segment === undefined ? 'page' : undefined}
        href=".">home</a>
    </li>
    <li>
      <a
        aria-current={segment === 'about' ? 'page' : undefined}
        href="about">about</a>
    </li>
  </ul>
</nav>
