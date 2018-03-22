<template>
  <button
    @click.prevent="handleClick"
    :class="[
      $style.root,
      {[$style.absolute]: absolute},
      {[$style.large]: large},
      {[$style[type]]: type}
    ]"
  >
    <slot />
  </button>
</template>

<script>
  export default {
    name: 'Button',
    props: [
      'absolute',
      'large',
      'type'
    ],
    methods: {
      handleClick() {
        this.$emit('click')
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    background-color: $color__primary--base;
    border-radius: 5px;
    padding: 8px 12px;
    color: #fff;
    justify-self: flex-end;
    margin-left: auto;
    text-transform: uppercase;
    border: 0;
    font-size: 12px;
    font-family: $font__family--sans;
    letter-spacing: 0.08em;
    font-weight: bold;
  }

  .absolute {
    position: absolute;
    right: 1em;
  }

  .large {
    font-size: 15px;
    font-family: $font__family--sans--especial;
  }

  .ghost,
  .ghost--bordered {
    background-color: transparent;
    color: $color__primary--base
  }

  .ghost--bordered {
    border: 1px solid currentColor;
  }
</style>
