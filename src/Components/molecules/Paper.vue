<template>
  <div :class="$style.root">
    <div v-for="item in data" :key="item.theme" :class="$style.section">
      <div :class="$style.title" tabindex="0">{{item.theme}}</div>
      <p
        v-for="answer in item.answers"
        v-if="answer.summary.length"
        :key="answer"
        :class="$style.answer"
      >
        {{answer.summary}}
      </p>
      <p v-else>
        Sin definir
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Paper",
    props: [
      "data"
    ],
    components: {},
    computed: {}
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    padding: 3em 1em;
    background-color: #fff;
    margin: 20px auto;
    max-width: 720px;
    width: 100%;
    max-height: $max-content-height;
    overflow: auto;
  }

  .title {
    color: $color__primary--base;
    font-size: 14px;
    font-family: $font__family--sans--especial;
    text-transform: uppercase;
  }

  .section {
    max-width: 537px;
    width: 100%;
    margin: 0 auto 2em;
    padding-bottom: 2em;
    border-bottom: 1px solid rgba(0, 0, 0, .25);
  }

  .section p {
    font-size: 14px;
    letter-spacing: 0.035em;
    line-height: 2;
    font-weight: normal;
    position: relative;

    &::before {
      content: '';
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 8px solid $color__primary--base;
      position: absolute;
      top: 9px;
      left: -16px;
    }
  }
</style>