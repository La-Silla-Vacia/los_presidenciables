<template>
  <div :class="$style.root">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'Container',
    props: [
      'isButton',
    ],
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #f6f6f6;
    padding: 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 18px;
  }
</style>
