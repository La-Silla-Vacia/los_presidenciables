<template>
  <div :class="[$style.root, {[$style[type]]: type}]">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'Container',
    props: [
      'isButton',
      'type'
    ]
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    width: 100%;
    position: relative;
    background-color: #f6f6f6;
    padding: 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 18px;
    overflow: auto;
    height: $max-content-height;
  }

  .sidebar {
    padding: 0;
    grid-template-columns: 220px 1fr;
    grid-template-rows: 1fr;
  }

  .comparing {
    grid-template-columns: 1fr 1fr;
    grid-gap: 0;
    padding: 0;
  }
</style>
