<template>
  <button
    v-if="isButton"
    :class="$style.root"
    @click="$emit('click')"
  >
    <slot/>
    <span :class="$style.caret"></span>
  </button>
  <div
    v-else
    :class="$style.root">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'Title',
    props: [
      'isButton'
    ]
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    font-family: $font__family--sans--especial;
    font-size: 18px;
    font-weight: bold;
    color: #000;
    border: 0;
    background: transparent;
    padding: 1rem 0;
    position: relative;

    small {
      font-size: 1em;
      font-weight: normal;
    }
  }

  .root:focus {
    outline: none;
  }

  .caret {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 6px solid currentColor;
    border-right: 6px solid transparent;
    border-left: 6px solid transparent;
    color: $color__primary--base;
    transition: transform .3s;
  }

  .root:focus .caret {
    transform: scale(1.2) translateY(-20%);
  }
</style>
