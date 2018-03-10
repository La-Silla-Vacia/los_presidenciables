<template>
  <button
    @click="handleClick"
    :class="[$style.root, {[$style.active]: isActive}]"
  >
    {{text}}
  </button>
</template>

<script>
  import * as types from '../../store/mutation-types'

  export default {
    name: 'SelectBarItem',
    props: [
      'isActive',
      'text'
    ],
    mounted () {
    },
    methods: {
      handleClick () {
        this.$emit('click')
        this.$store.commit(types.RECEIVE_THEME, { theme: this.text })
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    border: 0;
    background: transparent;
    font-family: map(fonts, family-sans);
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
    letter-spacing: 0.035em;
    padding: 0.5em;
    text-align: left;
    text-transform: uppercase;
  }

  .root:focus {
    outline: none;
    border-bottom: 1px solid map(colors, primary, base);
  }

  .active {
    color: map(colors, primary, base);
  }
</style>
