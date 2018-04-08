<template>
  <div>
    <Bar>
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

      <div :class="$style.content" ref="container"></div>

    </Container>
  </div>
</template>

<script>
  import Container from '../atoms/Container'
  import Bar from '../atoms/Bar'
  import Button from '../atoms/Button'
  import Select from '../atoms/Select'
  import ThumbBar from '../molecules/ThumbBar'
  import ThumbSelect from '../molecules/ThumbSelect'
  import Paper from '../molecules/Paper'

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
      handleFilterChange (e) {
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
        this.single = e
        this.setDefaultFilter()
        this.createWidget()
      },
      setDefaultFilter () {
        if (!this.single) {
          this.filter = [
            {name: 'Iván Duque', id: this.$store.getters.getCandidateByName('Iván Duque').trendsId},
            {name: 'Germán Vargas Lleras', id: this.$store.getters.getCandidateByName('Germán Vargas Lleras').trendsId},
            {name: 'Sergio Fajardo', id: this.$store.getters.getCandidateByName('Sergio Fajardo').trendsId},
            {name: 'Humberto de la Calle', id: this.$store.getters.getCandidateByName('Humberto de la Calle').trendsId},
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
      }
    },
    data () {
      return {
        embed: '<h2>Not working yet.</h2>',
        filter: [],
        single: false
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
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 1em;

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

  .buttons {
    margin-left: auto;
  }
</style>
