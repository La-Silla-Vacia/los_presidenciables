<template>
  <div :class="$style.root" ref="el"/>
</template>

<script>
  /* global d3 */
  export default {
    name: 'Sunburst',
    props: [
      'data'
    ],
    mounted () {
      this.create()
    },
    methods: {
      createData () {
        const dataString = JSON.stringify(this.data)
        return JSON.parse(dataString)
      },
      create () {
        const data = this.createData()
        const width = this.$refs.el.offsetWidth
        const height = this.$refs.el.offsetHeight * 0.8
        const radius = (Math.min(width, height) / 2) - 10
        console.log(radius)
        const formatNumber = d3.format(',d')

        const x = d3.scale.linear()
          .range([0, 2 * Math.PI])

        const y = d3.scale.sqrt()
          .range([0, radius])

        const color = d3.scale.category20c()

        const partition = d3.layout.partition()
          .value(function (d) {
            return d.size
          })

        const arc = d3.svg.arc()
          .startAngle(function (d) {
            return Math.max(0, Math.min(2 * Math.PI, x(d.x)))
          })
          .endAngle(function (d) {
            return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)))
          })
          .innerRadius(function (d) {
            return Math.max(0, y(d.y))
          })
          .outerRadius(function (d) {
            return Math.max(0, y(d.y + d.dy))
          })

        const svg = d3.select(this.$refs.el).append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + (height / 2) + ')')

        svg.selectAll('path')
          .data(partition.nodes(data))
          .enter().append('path')
          .attr('d', arc)
          .style('fill', function (d) {
            // console.log((d.children ? d : d.parent).name)
            return color((d.children ? d : d.parent).name)
          })
          .style('stroke', (d) => {
            return '#fff'
          })
          .style('stroke-width', () => {
            return '1px'
          })
          .on('click', click)
          .append('title')
          .text(function (d) {
            return d.name + '\n' + formatNumber(d.value)
          })

        function click (d) {
          svg.transition()
            .duration(750)
            .tween('scale', function () {
              const xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx])
              const yd = d3.interpolate(y.domain(), [d.y, 1])
              const yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius])
              return function (t) {
                x.domain(xd(t))
                y.domain(yd(t)).range(yr(t))
              }
            })
            .selectAll('path')
            .attrTween('d', function (d) {
              return function () {
                return arc(d)
              }
            })
        }

        d3.select(self.frameElement).style('height', height + 'px')
      }
    }
  }
</script>

<style module>
  .root {
    height: 100%;
  }
</style>
