<script context="module" lang="ts">
  const inputTypes = [
    'color',
    'date',
    'datetime-local',
    'week',
    'time',
    'range',
    'text',
    'search',
    'month',
    'tel',
    'number',
    'password',
    'file',
  ] as const;

  const initialFormValues: Readonly<{ type: string; value: string }> = {
    type: inputTypes[0],
    value: '',
  };

  initialFormValues as Readonly<typeof initialFormValues>;
</script>

<script lang="ts">
  import FeatureCard from '$components/FeatureCard.svelte';
  import { writable } from 'svelte/store';

  const formValues = writable({ ...initialFormValues });

  const onSelectTypeChange: DomEventHandler<Event, HTMLSelectElement> = (evt) => {
    formValues.update((curr) => ({
      ...curr,
      type: evt.currentTarget.value,
    }));
  };

  const onInputChange: DomEventHandler<Event, HTMLInputElement> = (evt) => {
    formValues.update((curr) => ({
      ...curr,
      value: evt.currentTarget.value,
    }));
  };
</script>

<FeatureCard id="form-widgets">
  <h3 slot="heading">Form Widgets</h3>

  <section>
    <h4>Input</h4>
    <form class="form" on:submit|preventDefault>
      <!-- svelte-ignore a11y-no-onchange -->
      <label
        >type
        <select name="type" on:change={onSelectTypeChange}>
          {#each inputTypes as inputType}
            <option value={inputType}>{inputType}</option>
          {/each}
        </select>
      </label>
      <label>input<input type={$formValues.type} on:input={onInputChange} /> </label>
    </form>
    <output class="form-output">
      <h5>value</h5>
      <pre>{$formValues.value}</pre>
    </output>
  </section>
</FeatureCard>

<style lang="scss">
  section {
    padding: 1rem 0;
  }

  .form {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    padding: 0.5rem 0;
    overflow: hidden;
  }

  .form-output {
    display: flex;
    flex-flow: column nowrap;
    padding: 0.5rem 0 0.5rem;
    width: 200px;
    pre {
      flex: 1 1 auto;
      height: 48px;
      line-height: 1.15;
      padding: 0 0 0 0.5rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }

  label {
    display: inline;
  }
</style>
