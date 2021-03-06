<template>
  <div :class="[$style.root, {[$style[`comparing--${this.compare}`]]: this.compare}]">
    <div :class="$style.detail_table">
      <div v-for="item in children" :class="$style.detail_table__row">
        <div :class="$style.mark" :style="{backgroundColor: getColor(item.name)}"></div>
        <div :class="$style.partido">{{item.name}}</div>
        <div :class="$style.num">{{toNiceNumber(item.value)}}</div>
      </div>
      <div :class="[$style.detail_table__row, $style.detail_table__row__total]">
        <div :class="$style.partido">POSIBLES VOTOS</div>
        <div :class="$style.num">{{toNiceNumber(data.total)}}</div>
      </div>
    </div>
    <button v-if="!acceptsHover" :class="$style.buttonScale" @click="handleOpen"></button>
    <div v-if="open" :class="$style.overlay">
      <button :class="[$style.buttonScale, $style.buttonHide]" @click="open = false"></button>
      <div ref="thumb"></div>
      <div
        v-if="current"
        :class="[$style.tooltip, $style.tooltipThumb]"
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
    </div>
    <div :class="$style.el" ref="el">
      <transition name="fade">
        <div
          v-if="current && acceptsHover && !open"
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
      'data',
      'compare',
      'ratio'
    ],
    mounted () {
      this.create()
    },
    methods: {
      createData () {
        const dataString = JSON.stringify(this.data)
        const data = JSON.parse(dataString)
        return data
      },
      toNiceNumber (n) {
        return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').replace('.00', '')
      },
      getColor (name) {
        const colorFunc = d3.scale.category20c()
        const c = colors.filter(color => {
          if (color.name === name) return true
        })
        if (c.length) {
          return c[0].color
        } else {
          return colorFunc(name)
        }
      },
      handleOpen () {
        this.open = true
        setTimeout(() => {
          this.create(this.$refs.thumb)
        }, 50)
      },
      create (el) {
        const data = this.createData()
        const element = el || this.$refs.el
        const width = element.offsetWidth
        let height = element.offsetHeight * 0.8
        if (!height) height = width
        const radius = ((Math.min(width, height) / 2) - 10) * this.ratio

        const x = d3.scale.linear()
          .range([0, 2 * Math.PI])

        const y = d3.scale.sqrt()
          .range([0, radius])

        const color = d3.scale.category20c()

        const partition = d3.layout.partition()
          .value(function (d) {
            return d.size
          })

        let dif = 0

        const arc = d3.svg.arc()
          .startAngle(d => {
            let sum = Math.max(0, Math.min(2 * Math.PI, x(d.x)))
            if (this.compare) {
              sum = sum / 2
              if (this.compare === 'left') {
                sum = sum + (180 * (Math.PI / 180))
              }
            }
            return sum
          })
          .endAngle(d => {
            let sum = Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)))
            if (this.compare) {
              sum = sum / 2
              if (this.compare === 'left') {
                sum = sum + (180 * (Math.PI / 180))
              }
            }
            return sum
          })
          .innerRadius(d => {
            return Math.max(0, y(d.y)) - dif
          })
          .outerRadius(d => {
            if (d.depth === 0) {
              dif = Math.max(0, y(d.y + d.dy)) - 45
              return 45
            }
            return Math.max(0, y(d.y + d.dy)) - dif
          })

        const xOffset = this.compare === 'right' ? 0 : height / 2
        const svg = d3.select(element).append('svg')
          .attr('width', this.compare ? height / 2 : height)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + xOffset + ',' + (height / 2) + ')')

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
          // .on('click', click)
          .on('mousemove', (d) => {
            this.current = {
              data: d,
              x: d3.event.layerX,
              y: d3.event.layerY
            }
          })
          .on('mouseout', () => {
            if (!this.open) {
              this.current = null
            }
          })
          .on('.click', (d) => {
            this.current = {
              data: d
            }
          })

        this.children = data.children

        d3.select(self.frameElement).style('height', height + 'px')

        const avatarPath = element.querySelector('path')
        if (this.compare) {
          avatarPath.style.fill = 'transparent'
          return
        }
        const avatarRect = avatarPath.getBoundingClientRect()
        const avatarWidth = avatarRect.width
        this.avatarPathWidth = avatarRect.width
        svg.append('defs')
          .append('pattern')
          .attr('id', `img-${this.candidate.id}`)
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
        avatarPath.style.fill = `url(#img-${this.candidate.id})`
      }
    },
    watch: {
      data (oldData, newData) {
        if (oldData.name !== newData.name) {
          this.$refs.el.innerHTML = ''
          this.create()
        }
      },
      ratio (oldData, newData) {
        if (oldData !== newData) {
          this.$refs.el.innerHTML = ''
          this.create()
        }
      }
    },
    computed: {
      candidate () {
        return this.$store.getters.getCandidateByName(this.createData().name)
      },
      candidatePhoto () {
        return this.candidate.foto || photo
      },
      acceptsHover () {
        if (this.open) return true
        return !(this.$store.getters.isTablet() && !this.open)
      }
    },
    data () {
      return {
        current: null,
        avatarPathWidth: 230,
        avatarCoords: {x: 0, y: 0},
        children: [],
        open: false
      }
    }
  }
</script>

<style module lang="scss">
  @import "../../assets/styles/base";

  .root,
  .el {
    position: relative;
    width: 100%;

    @media only screen and (min-width: 992px) {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }

  .el svg {
    margin: auto;
  }

  .tooltip {
    position: absolute;
    width: 285px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    pointer-events: none;
    z-index: 100;

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

  .tooltipThumb {
    position: relative;
    width: 90%;
    margin: -1em auto 1em;

    &::before {
      display: none;
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

  .comparing--left svg {
    margin: auto 0 auto auto;
  }

  .comparing--right svg {
    margin: auto auto auto 0;
  }

  .detail_table {
    width: calc(100% - 1em);
    border-top: 1px solid rgba(149, 152, 154, 0.25);
    margin-top: 1em;
    top: 0;
    left: 2em;

    @media only screen and (min-width: 992px) {
      width: 190px;
      position: absolute;
      z-index: 10;
      margin-top: 3em;
    }
  }

  .comparing--right .detail_table {
    left: inherit;
    right: 2em;
  }

  .detail_table__row {
    border-bottom: 1px solid rgba(149, 152, 154, 0.25);
    position: relative;
    padding: 8px 0 8px 20px;
  }

  .mark {
    width: 10px;
    height: 10px;
    background-color: #000;
    position: absolute;
    left: 0;
    top: 10px;
    border-radius: 50%;
  }

  .partido {
    font-family: 'Roboto Condensed', 'Roboto', sans-serif;
    color: rgba(0, 0, 0, .4);
    font-size: 12px;
    line-height: 1;
  }

  .num {
    color: #000;
    font-family: $font__family--sans--especial;
    font-size: 18px;
    letter-spacing: 0.035em;
    font-weight: bold;
    line-height: 1;
    text-align: right;
  }

  .detail_table__row__total {
    background-color: $color__primary--base;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;

    .partido {
      font-weight: normal;
    }

    .partido,
    .num {
      color: #fff;
    }
  }

  .buttonScale {
    background: url("../../assets/images/scale_button.svg");
    border-radius: 0;
    border: 0;
    width: 29px;
    height: 28px;
    transform: translateY(100%);
    z-index: 5;
    float: right;
    margin-right: 15px;
    position: relative;
  }

  .buttonHide {
    background: url("../../assets/images/close_button.svg")
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    background-color: rgba(255, 255, 255, .95);
    z-index: 6;
  }
</style>
