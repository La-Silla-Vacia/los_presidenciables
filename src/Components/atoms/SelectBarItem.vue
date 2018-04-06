<template>
  <router-link
    :to="`#${text.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`"
    @click.native="handleClick"
    :class="[$style.root, {[$style.active]: isActive}]"
  >
    {{text}}
  </router-link>
</template>

<script>
  import * as types from '../../store/mutation-types'

  export default {
    name: 'SelectBarItem',
    props: [
      'isActive',
      'text'
    ],
    methods: {
      handleClick () {
        this.$emit('click')
        this.$store.commit(types.RECEIVE_SITE, { theme: this.text })
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    border: 0;
    background: transparent;
    font-family: $font__family--sans;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
    letter-spacing: 0.035em;
    padding: 0.5em;
    text-align: left;
    text-transform: uppercase;
  }

  .root:focus {
    outline: none;
    border-bottom: 1px solid $color__primary--base;
    text-decoration: none;
  }

  .active {
    color: $color__primary--base;
  }
</style>
