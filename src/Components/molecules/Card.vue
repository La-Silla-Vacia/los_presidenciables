<template>
  <div :class="$style.root">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'Card',
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #f5f5f5;
    padding: 1em;
    break-inside: avoid;
  }

  .root p {
    font-size: 13px;
    color: #000;
    font-family: $font__family--sans--especial;
    line-height: 1.46;
    font-weight: normal;
  }
</style>
