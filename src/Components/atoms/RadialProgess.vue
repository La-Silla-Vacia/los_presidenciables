<template>
  <div ref="root" :class="$style.root">
    <div :class="$style.title">{{title}}</div>
  </div>
</template>

<script>
  /* global d3 */

  export default {
    name: 'RadialProgress',
    props: [
      'percentage',
      'title'
    ],
    mounted () {
      const $el = this.$refs.root
      if (!$el) return
      var outerRadius = this.size / 2
      var innerRadius = outerRadius * 0.85

      var svg = d3.select($el)
        .append('svg')
        .attr('width', this.size)
        .attr('height', this.size)
        .append('g')
        .attr('transform', `translate(${outerRadius},${outerRadius})`)

      var arc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0)
        .endAngle(Math.PI * 2)

      svg.append('path')
        .attr('fill', '#ECEEEF')
        .attr('d', arc)

      var endAngle = this.percentage * Math.PI * 2

      arc = arc.endAngle(endAngle)
      svg.append('path')
        .attr('fill', '#44A5DB')
        .attr('d', arc)
    },
    data () {
      return {
        size: 86
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    position: relative;
    text-align: center;
  }

  .title {
    font-family: $font__family--sans--especial;
    font-size: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    line-height: 1;
    max-width: 70px;
  }
</style>
