<template>
  <div :class="$style.row">
    <div style="padding: 10px 30px; font-weight: bold;border-bottom: 3px solid #f6f6f6;">{{candidate.name}}</div>
    <button
      :class="$style.bar"
      @click="open = !open"
    >
      <div :class="$style.num">$0</div>
      <div :class="$style.percentage">0%</div>
      <div :class="$style.line">
        <div :class="$style.line__inner" style="width: 0%"></div>
      </div>
      <div :class="$style.num">$24.235 millones</div>
    </button>

    <div
      v-if="open"
      :class="[$style.bar, $style['bar--details']]"
    >
      <RadialProgress
        v-for="item in data(candidate.name)"
        :key="item.tipoDeGasto"
        percentage="0"
        :title="item.tipoDeGasto"
      ></RadialProgress>
    </div>
  </div>
</template>

<script>
  import RadialProgress from '../atoms/RadialProgess'

  export default {
    name: 'SpendingsRow',
    components: {
      RadialProgress
    },
    props: [
      'candidate'
    ],
    methods: {
      data (name) {
        return this.$store.getters.getGastados(name)
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

  .row {
    background-color: #fff;
    width: 100%;
    margin-bottom: 1em;
    position: relative;

    &::before {
      content: '';
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 8px solid #44a5db;
      position: absolute;
      top: 77px;
      left: -16px;
    }
  }

  .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
    padding: 24px 30px;
    width: 100%;
    border: 0;
    flex-wrap: wrap;

    &:focus {
      border-left: 1px solid $color__primary--base;
      outline: none;
    }
  }

  .bar--details {
    border-top: 3px solid #f6f6f6;
  }

  .num {
    font-size: 12px;
  }

  .percentage {
    margin-left: 1em;
    color: $color__primary--base;
    font-size: 12px;
    padding: 7px 5px;
    background-color: rgba(68, 165, 219, .2)
  }

  .line {
    height: 10px;
    background-color: #ECEEEF;
    border-radius: 5px;
    flex-grow: 1;
    margin: 0 1em;
  }

  .line__inner {
    height: 100%;
    background-color: $color__primary--base;
    border-radius: 5px;
  }
</style>
