<template>
  <div :class="[$style.root, {[$style.isInActive]: isInActive}]">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'Card',
    props: [
      'isInActive'
    ]
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #f5f5f5;
    padding: 1em;
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;
    max-height: 18em;
  }

  .root p {
    font-size: 13px !important;
    color: #000;
    font-family: $font__family--sans--especial;
    line-height: 1.46 !important;
    font-weight: normal;
    margin: 0 0 8px;
  }

  .isInActive {
    opacity: .25;
  }
</style>
