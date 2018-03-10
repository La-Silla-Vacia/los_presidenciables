<template>
  <div :class="$style.root">
    <header :class="$style.header">
      <Title @click.native="open = !open" :isButton="true">{{items.active}}</Title>
      <slot />
    </header>
    <transition name="fade">
      <nav v-if="open" :class="$style.nav">
        <SelectBarItem
          v-for="theme in items.items"
          :key="theme"
          :text="theme"
          :isActive="theme === items.active"
          @click="open = false"
        />
      </nav>
    </transition>
  </div>
</template>

<script>
  import Title from '../atoms/Title'
  import SelectBarItem from '../atoms/SelectBarItem'

  export default {
    name: 'SelectBar',
    props: [
      'items'
    ],
    components: {
      Title,
      SelectBarItem
    },
    methods: {
      handleClick () {
        console.log('clicked')
      }
    },
    data () {
      return {
        open: false
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    border-bottom: 1px solid rgba(149, 152, 154, 0.25);
    position: relative;
    width: 100%;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav {
    position: absolute;
    bottom: -1px;
    transform: translateY(100%);
    padding: 1em;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
    z-index: 1;
    background-color: #fff;
  }

  .nav::before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    width: 0.75em;
    height: 0.75em;
    transform: translateY(-50%) rotate(45deg);
    border: 1px solid rgba(149, 152, 154, 0.25);
    border-right: 0;
    border-bottom: 0;
    background-color: #fff;
  }
</style>
