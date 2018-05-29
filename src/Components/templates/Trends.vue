<template>
  <div>
    <Bar title="Cómo los buscan">
      <div :class="$style.buttons">
        <Button type="ghost" @click="handleModeChange(false)">
          <img v-if="!single" src="../../assets/images/icon_graph--active.svg"/>
          <img v-else src="../../assets/images/icon_graph.svg"/>
        </Button>
        <Button type="ghost" @click="handleModeChange(true)">
          <img v-if="single" src="../../assets/images/icon_graph-bar--active.svg"/>
          <img v-else src="../../assets/images/icon_graph-bar.svg"/>
        </Button>
      </div>
    </Bar>
    <Container type="sidebar">
      <ThumbBar
        @change="handleFilterChange"
        :buttons="true"
        :filter="filter"
      />

      <div :class="$style.content">
        <div :class="$style.graph" ref="container"></div>
        <small>Google toma como 100 el día con más interés por un candidato. Gradúa los demás días y candidatos en
          proporción a ese punto máximo; si dice 10, es una décima parte de las búsquedas de ese récord
        </small>

        <div :class="$style.footer">
          <button
            v-if="chunckedEvents.length - 1 >= currentI && currentI !== 0"
            :class="$style.arrowLeft"
            @click="currentI -= 1"
          >
          </button>
          <div
            v-for="trend in events"
            :class="$style.article"
          >
            <div :class="$style.date">{{toDate(trend.date)}}</div>
            <div :class="$style.title">{{trend.name}}</div>
            <div :class="$style.text" v-html="toMarkdown(trend.text)"></div>
          </div>
          <button
            v-if="chunckedEvents.length - 1 > currentI"
            :class="$style.arrowRight"
            @click="currentI += 1"
          ></button>
        </div>
      </div>

    </Container>
  </div>
</template>

<script>
  import moment from 'moment'
  import MarkdownIt from 'markdown-it'

  import Container from '../atoms/Container'
  import Bar from '../atoms/Bar'
  import Button from '../atoms/Button'
  import Select from '../atoms/Select'
  import ThumbBar from '../molecules/ThumbBar'
  import ThumbSelect from '../molecules/ThumbSelect'
  import Paper from '../molecules/Paper'

  const md = new MarkdownIt()
  Object.defineProperty(Array.prototype, 'chunk', {
    value: function (chunkSize) {
      var R = []
      for (var i = 0; i < this.length; i += chunkSize) {
        R.push(this.slice(i, i + chunkSize))
      }
      return R
    }
  })

  export default {
    name: 'Trends',
    components: {
      Container,
      Bar,
      Button,
      Select,
      ThumbBar,
      ThumbSelect,
      Paper
    },
    mounted () {
      this.setDefaultFilter()
      this.createWidget()
    },
    methods: {
      createWidget () {
        if (this.filter.length) {
          this.$refs.container.innerHTML = ''
        } else {
          this.$refs.container.innerHTML =
            '<em>Seleccione al menos 1 candidato</em>'
          return
        }

        const items = this.comparisonItems
        if (this.single) {
          trends.embed.renderExploreWidgetTo(this.$refs.container, 'GEO_MAP', {
            comparisonItem: this.comparisonItems
          })
          trends.embed.renderExploreWidgetTo(this.$refs.container, 'RELATED_TOPICS', {
            'comparisonItem': this.comparisonItems,
            'category': 0,
            'property': ''
          })
        } else {
          trends.embed.renderExploreWidgetTo(this.$refs.container, 'TIMESERIES', {
            comparisonItem: items,
            category: 0,
            property: ''
          })
        }
      },
      toMarkdown (text) {
        return md.render(text)
      },
      toDate (date) {
        return moment(date).format('D MMM Y')
      },
      handleFilterChange (e) {
        this.currentI = 0
        const id = this.$store.getters.getCandidateByName(e).trendsId
        const obj = {name: e, id: id}
        if (this.single) {
          this.filter = [obj]
        } else {
          let arrayIndex = -1
          for (let i = 0; i < this.filter.length; i += 1) {
            if (this.filter[i].name === e) arrayIndex = i
          }
          if (arrayIndex !== -1) {
            this.filter.splice(arrayIndex, 1)
          } else if (this.filter.length === 5) {
            alert('You can\'t select more than 5 people at the time')
          } else {
            this.filter.push(obj)
          }
        }
        this.createWidget()
      },
      handleModeChange (e) {
        this.currentI = 0
        this.single = e
        this.setDefaultFilter()
        this.createWidget()
      },
      setDefaultFilter () {
        if (!this.single) {
          this.filter = [
            {name: 'Iván Duque', id: this.$store.getters.getCandidateByName('Iván Duque').trendsId},
            {name: 'Gustavo Petro', id: this.$store.getters.getCandidateByName('Gustavo Petro').trendsId}
          ]
        } else {
          this.filter = [{name: 'Iván Duque', id: this.$store.getters.getCandidateByName('Iván Duque').trendsId}]
        }
      }
    },
    computed: {
      candidate () {
        const candidate = this.$route.params.uid
        return this.$store.getters.getCandidateByUid(candidate)
      },
      comparing () {
        return this.$store.getters.isComparing()
      },
      isSingle () {
        return this.$route.params.uid
      },
      data () {
        return this.$store.getters.getMaquinaria(this.candidate.name)
      },
      events () {
        const names = this.filter.map(item => {
          return item.name
        })
        const events = this.$store.getters.getTrendEvents(names)
        if (this.isSmallScreen) {
          this.chunckedEvents = events.chunk(1)
        } else {
          this.chunckedEvents = events.chunk(3)
        }
        return this.chunckedEvents[this.currentI]
      },
      comparisonItems () {
        const candidates = this.filter
        const result = []

        const d = new Date()
        const date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()

        candidates.map((candidate, i) => {
          if (this.single) {
            if (i > 4) return
            result.push({'keyword': candidate.id, 'geo': 'CO', 'time': '2018-03-12 ' + date})
          } else {
            if (i > 4) return
            result.push({keyword: candidate.id, geo: '', time: '2018-03-12 ' + date})
          }
        })
        return result
      },
      isSmallScreen () {
        return this.$store.getters.isTablet()
      }
    },
    data () {
      return {
        embed: '<h2>Not working yet.</h2>',
        filter: [],
        single: false,
        currentI: 0,
        chunckedEvents: []
      }
    }
  }
</script>

<style module lang='scss'>
  @import '../../assets/styles/base';

  .content {
    max-width: 937px;
    width: 100%;
    margin: 1em auto;

    p {
      font-family: $font__family--serif--especial;
      margin: 0 0 0.5em 0;
      font-size: 18px;
    }

    .highlight {
      color: $color__primary--base;
      font-family: $font__family--sans--especial;
      font-size: 12px;
      letter-spacing: 0.035em;
      font-weight: bold;
      margin-top: 2em;
    }
  }

  .graph {
    display: grid;
    grid-gap: 1em;

    @media (min-width: 992px) {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
  }

  .footer {
    margin-top: 15px;
    padding: 15px 40px 0;
    height: 140px;
    border-top: 1px solid rgba(148, 152, 154, .25);
    display: grid;
    grid-template-columns: repeat(3, minmax(200px, 1fr));
    grid-gap: 2em;
    position: relative;
  }

  .article {
    font-family: $font__family--sans--especial;
  }

  .date {
    font-size: 11px;
    color: #B1B9BD;
    font-weight: 900;
  }

  .title {
    font-size: 18px;
    color: #000;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .text {
    & p {
      font-family: $font__family--sans--especial;
      margin: 0 0 9px;
      font-size: 12px;
      color: #444848;
    }
  }

  .arrowLeft,
  .arrowRight {
    position: absolute;
    width: 18px;
    height: 35px;
    border: 0;
    background: url(../../assets/images/arrow_left.svg);
    top: 50%;
    transform: translate(0, -50%);
  }

  .arrowRight {
    background: url(../../assets/images/arrow_right.svg);
    right: 0;
  }
</style>
