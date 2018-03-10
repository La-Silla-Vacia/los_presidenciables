<template>
  <div :class="$style.root"></div>
</template>

<script>
  export default {
    name: 'Hr',
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    background-color: rgba(0, 0, 0, 0.5);
    height: 1px;
    margin: 7px 0 12px;
  }
</style>
