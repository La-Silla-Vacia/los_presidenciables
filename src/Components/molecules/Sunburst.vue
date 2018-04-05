<template>
  <div :class="$style.root">
    <div :class="$style.el" ref="el">
      <transition name="fade">
        <div
          v-if="current"
          :class="$style.tooltip"
          :style="{
          left: current.x + 10 + 'px',
          top: current.y - 40 + 'px',
        }"
        >
          <header :class="$style.header">
            <div :class="$style.partido">
              {{current.data.name}}
            </div>
            <div :class="$style.votes">
              <span>VOTOS</span>
              {{current.data.value}}
            </div>
          </header>
          <div :class="$style.content">
            {{current.data.explicacion}}
          </div>
          <div :class="$style.table" v-if="current.data.children">
            <div v-for="row in current.data.children" :class="$style.row">
              <span>{{row.name}}</span>
              {{row.value}}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  /* global d3 */
  import colors from '../colors'

  const photo = require('../../assets/images/photo_default.jpg')

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
          .style('fill', (d) => {
            let parent = (d.children ? d : d.parent)
            if (parent.parent && parent.parent.name !== this.candidate.name) parent = parent.parent
            const colorOptions = colors.filter(color => {
              if (color.name === parent.name) return true
            })
            return colorOptions.length ? colorOptions[0].color : color((d.children ? d : d.parent).name)
          })
          .style('opacity', (d) => {
            if (d.depth === 2) {
              return 0.8
            } else if (d.depth === 3) {
              return 0.6
            }
          })
          .style('stroke', () => {
            return '#fff'
          })
          .style('stroke-width', () => {
            return '1px'
          })
          .on('click', click)
          .on('mousemove', (d) => {
            this.current = {
              data: d,
              x: d3.event.layerX,
              y: d3.event.layerY
            }
          })
          .on('mouseout', () => {
            this.current = null
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

        const avatarPath = this.$refs.el.querySelector('path')
        const avatarRect = avatarPath.getBoundingClientRect()
        const avatarWidth = avatarRect.width
        this.avatarPathWidth = avatarRect.width
        svg.append('defs')
          .append('pattern')
          .attr('id', 'img1')
          .attr('patternUnits', 'userSpaceOnUse')
          .attr('width', avatarWidth)
          .attr('height', avatarWidth)
          .attr('x', avatarWidth / 2)
          .attr('y', avatarWidth / 2)
          .append('image')
          .attr('xlink:href', this.candidatePhoto)
          .attr('width', avatarWidth)
          .attr('height', avatarWidth)
          .attr('x', 0)
          .attr('y', 0)
        avatarPath.style.fill = 'url(#img1)'
      }
    },
    computed: {
      candidate () {
        return this.$store.getters.getCandidateByName(this.createData().name)
      },
      candidatePhoto () {
        return this.candidate.foto || photo
      }
    },
    data () {
      return {
        current: null,
        avatarPathWidth: 230,
        avatarCoords: {x: 0, y: 0}
      }
    }
  }
</script>

<style module lang="scss">
  @import "../../assets/styles/base";

  .root,
  .el {
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
  }

  .tooltip {
    position: absolute;
    width: 285px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    pointer-events: none;

    &::before {
      content: '';
      width: 13px;
      height: 13px;
      position: absolute;
      left: 0;
      transform: translateX(-50%) rotate(45deg);
      background: rgba(255, 255, 255, 0.9);
      top: 2em;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 12px;
  }

  .partido {
    font-weight: bold;
    text-transform: uppercase;
  }

  .votes {
    font-size: 14px;
    color: #000;

    & span {
      font-size: 8px;
      color: rgba(0, 0, 0, .4);
    }
  }

  .content {
    font-family: $font__family--sans--especial;
    font-size: 11px;
    color: #171918;
    margin-top: 1em;
  }

  .table {
    border-top: 1px solid #B2BABF;
    font-family: $font__family--sans--especial;
    font-size: 12px;
    margin-top: 1em;
  }

  .table span {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 8px;
    font-family: $font__family--sans;
  }

  .row {
    border-bottom: 1px solid #B2BABF;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
