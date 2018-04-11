<template>
  <div :class="[$style.root, {[$style[type]]: type}]">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'Container',
    props: [
      'isButton',
      'type'
    ]
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    width: 100%;
    position: relative;
    background-color: #f6f6f6;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 18px;
    overflow: auto;
    padding: 1em;

    @media only screen and (min-width: 1024px) {
      height: $max-content-height;
      padding: 40px;
      grid-gap: 10px;
    }
  }

  .sidebar {
    padding: 0;
    grid-template-columns: 235px 1fr;
    grid-template-rows: 1fr;

    @media only screen and (max-width: 992px) {
      grid-template-columns: 69px 1fr;
    }
  }

  .comparing {
    grid-template-columns: 1fr 1fr;
    grid-gap: 0;
    padding: 0;

    @media only screen and (max-width: 992px) {
      grid-template-columns: 1fr;
    }
  }

  .full {
    grid-template-columns: 1fr;
  }
</style>
