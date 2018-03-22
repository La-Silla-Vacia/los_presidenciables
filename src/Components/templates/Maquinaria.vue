<template>
  <div>
    <Bar title="¿Quien le pone los votos?">
      <Button v-if="!comparing" :absolute="true" @click="handleCompareClick(true)">COMPARAR</Button>
      <Button v-else type="ghost" :absolute="true" @click="handleCompareClick(false)">
        <img src="../../assets/images/close.svg" width="8"/>
        CLOSE
      </Button>
    </Bar>
    <Container :type="comparing ? 'comparing' : 'sidebar'">
      <ThumbBar routeBase="/la-maquinaria/"/>

      <div v-if="isSingle">
        <Sunburst v-if="data" :data='data'/>
        <h2 v-else>No data</h2>
      </div>

      <div v-else :class="$style.content">
        <p>Monocle ipsum dolor sit amet joy cosy Airbus A380 ANA bulletin punctual. Ettinger international Marylebone
          hub. Winkreative bulletin premium perfect Porter lovely. Comme des Garçons Washlet sharp bulletin, uniforms
          charming izakaya handsome Toto punctual destination wardrobe. Quality of life perfect first-class Nordic hub
          Washlet hand-crafted artisanal uniforms sophisticated craftsmanship Singapore exclusive.</p>

        <p>Comme des Garçons Washlet sharp bulletin, uniforms charming izakaya handsome Toto punctual destination
          wardrobe. Quality of life perfect first-class Nordic hub Washlet hand-crafted artisanal uniforms sophisticated
          craftsmanship Singapore exclusive.</p>

        <p :class="$style.highlight">SELECCIONE UN CANDIDATO PARA VER SUS FACTORES DE PODER</p>
      </div>

    </Container>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'

  import Container from '../atoms/Container'
  import Bar from '../atoms/Bar'
  import Button from '../atoms/Button'
  import ThumbBar from '../molecules/ThumbBar'
  import ThumbSelect from '../molecules/ThumbSelect'
  import Paper from '../molecules/Paper'
  import Sunburst from '../molecules/Sunburst'

  export default {
    name: 'Maquinaria',
    components: {
      Container,
      Bar,
      Button,
      ThumbBar,
      ThumbSelect,
      Paper,
      Sunburst
    },
    methods: {
      handleCompareClick (state) {
        this.$store.commit(types.RECEIVE_COMPARE, {
          active: state,
          first: this.candidate
        })
      }
    },
    mounted () {
      this.$store.commit(types.RECEIVE_COMPARE, {active: false})
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
      }
    },
    data () {
      return {}
    }
  }
</script>

<style module lang="scss">
  @import "../../assets/styles/base";

  .content {
    max-width: 617px;
    margin: 4em 0 0 2em;

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
</style>
