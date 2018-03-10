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
    align-items: center;
    justify-content: space-around;
    background-color: #f6f6f6;
    padding: 40px;
  }
</style>
