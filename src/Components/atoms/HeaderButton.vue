<template>
  <router-link
    :to="{name: text}"
    @click="handleClick"
    :active-class="$style.active"
    :class="$style.root"
  >
    {{text}}
  </router-link>
</template>

<script>
  import * as types from '../../store/mutation-types'

  export default {
    name: 'HeaderButton',
    props: [
      'isActive',
      'text'
    ],
    methods: {
      handleClick () {
        this.$store.commit(types.RECEIVE_CHAPTER, { chapter: this.text })
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    border: 0;
    background: transparent;
    font-family: $font__family--sans--especial;
    font-size: 11px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.5);
    padding: 1em 0;
    letter-spacing: 0.035em;
    position: relative;
  }

  .root:focus,
  .root:hover {
    outline: none;
    color: $color__primary--base;
    text-decoration: none;
  }

  .root::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    background-color: currentColor;
    height: 0;
  }

  .active {
    color: $color__primary--base;
  }

  .active::after {
    height: 3px;
  }
</style>
