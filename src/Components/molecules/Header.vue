<template>
  <header :class="$style.root">
    <nav :class="$style.nav">
      <HeaderButton
        v-for="chapter in chapters"
        :key="chapter"
        :callback="handleClick"
        :isActive="chapter === activeChapter"
        :text="chapter"
      >
      </HeaderButton>
    </nav>
  </header>
</template>

<script>
  import HeaderButton from '../atoms/HeaderButton'

  export default {
    name: 'Header',
    components: {
      HeaderButton
    },
    mounted () {
    },
    methods: {},
    computed: {
      chapters () {
        return this.$store.getters.getChapters()
      },
      activeChapter () {
        return this.$store.getters.getActiveChapter()
      }
    },
    methods: {
      handleClick (name) {
        alert(name)
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    border: 1px solid rgba(149, 152, 154, 0.25);
    border-left: 0;
    border-right: 0;
    width: 100%;
  }

  .nav {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
</style>
