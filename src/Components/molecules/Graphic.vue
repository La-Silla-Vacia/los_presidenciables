<template>
  <div :class="$style.root">
    <Header />
    <SelectBar :items="themes" />
  </div>
</template>

<script>
  import Header from './Header'
  import SelectBar from './SelectBar'

  export default {
    name: 'Graphic',
    components: {
      Header,
      SelectBar
    },
    computed: {
      themes () {
        console.log(this.$store.getters.getThemes())
        return this.$store.getters.getThemes()
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    width: 100%;
    height: 100%;
    position: relative;
    padding-bottom: 2em;
  }

  .circle {
    border-radius: 50%;
    background-color: $color__red--santander;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .4s;
    border: 0;

    &:hover {
      background-color: $color__red--lider;
      color: #fff;
    }
  }
</style>
