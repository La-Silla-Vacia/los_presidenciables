<template>
  <div :class="$style.root">
    <header :class="$style.header">
      <Title
        v-if="subTitle"
        @click="$emit('title-click')"
        :isButton="titleIsButton"
      >
        <small>{{subTitle}} -</small>
        {{title}}
      </Title>
      <Title
        v-else
        @click="$emit('title-click')"
        :isButton="titleIsButton"
      >
        {{title}}
      </Title>
      <slot/>
    </header>
  </div>
</template>

<script>
  import Title from '../atoms/Title'
  import SelectBarItem from '../atoms/SelectBarItem'

  export default {
    name: 'Bar',
    props: [
      'title',
      'sub-title',
      'title-is-button'
    ],
    components: {
      Title
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
    z-index: 2;
    grid-column: span 2;
    background-color: #fff;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>
