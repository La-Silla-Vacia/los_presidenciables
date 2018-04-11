<template>
  <div>
    <Bar title="¿Quien le pone los votos?">
      <Button v-if="!comparing && isSingle && !isSmallScreen" :absolute="true" @click="handleCompareClick(true)">
        COMPARAR
      </Button>
      <Button v-else-if="isSingle && !isSmallScreen" type="ghost" :absolute="true" @click="handleCompareClick(false)">
        <img src="../../assets/images/close.svg" width="8"/>
        CLOSE
      </Button>
    </Bar>
    <Container :type="comparing ? 'comparing' : 'sidebar'">
      <ThumbBar v-if="!comparing" routeBase="/la-maquinaria/"/>

      <div :class="$style.container" v-if="isSingle && !comparing">
        <Sunburst v-if="data" :data="data" :ratio="1"/>
        <h2 :class="$style.highlight" style="font-size: 18px" v-else>Hasta ahora no tiene apoyos políticos sustanciales
          y medibles</h2>
      </div>

      <div v-if="!isSingle" :class="$style.content">
        <p>Los políticos profesionales suelen decir que mientras en las elecciones legislativas la maquinaria mueve el
          70 por ciento de los votos y la opinión el 30 por ciento restante, en las presidenciales es al revés. Pero el
          impacto de las estructuras organizadas de los caciques electorales suele ser mayor entre más reñida esté la
          contienda entre los candidatos que se apoyan en ellas.</p>

        <p>Para entender qué fuerza electoral tienen los apoyos políticos que han recibido los candidatos, revisamos a
          quién apoyan los congresistas y partidos. A cada uno le damos un peso según sus resultados electorales, cifras
          que si bien no necesariamente significan que pongan de manera mecánica esos votos, sí ayudan a entender el
          paso de cada apoyo.</p>

        <p>Iremos actualizando este ese ejercicio a medida que vayan variando esos apoyos.</p>

        <p :class="$style.highlight">SELECCIONE UN CANDIDATO PARA VER SUS FACTORES DE PODER</p>
      </div>

      <div v-if="comparing" :class="[$style.Proposal, $style.Proposal__left]">
        <ThumbSelect which="first">
          <div :class="$style.possible_votes">
            POSIBLES VOTOS <strong>{{dataFirst.total}}</strong>
          </div>
        </ThumbSelect>
        <Sunburst
          v-if="dataFirst"
          :key="dataFirst.name"
          compare="left"
          :data="dataFirst"
          :ratio="ratio.first"
        />
        <div v-else>No data</div>
      </div>
      <div v-if="comparing" :class="[$style.Proposal, $style.Proposal__right]">
        <ThumbSelect which="second">
          <div v-if="dataSecond" :class="$style.possible_votes">
            POSIBLES VOTOS <strong>{{dataSecond.total}}</strong>
          </div>
        </ThumbSelect>
        <Sunburst
          v-if="dataSecond"
          compare="right"
          :data="dataSecond"
          :ratio="ratio.second"
        />
        <div v-else>No data</div>
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
          first: this.candidate,
          second: null
        })
      }
    },
    mounted () {
      this.$store.commit(types.RECEIVE_COMPARE, {active: false, first: this.candidate, second: null})
    },
    computed: {
      candidate () {
        const candidate = this.$route.params.uid
        return this.$store.getters.getCandidateByUid(candidate)
      },
      isSingle () {
        return this.$route.params.uid
      },
      data () {
        return this.$store.getters.getMaquinaria(this.candidate.name)
      },
      compareFirst () {
        return this.$store.getters.isComparing('first')
      },
      compareSecond () {
        return this.$store.getters.isComparing('second')
      },
      dataFirst () {
        return this.$store.getters.getMaquinaria(this.compareFirst.name)
      },
      dataSecond () {
        if (this.compareSecond) {
          return this.$store.getters.getMaquinaria(this.compareSecond.name)
        }
      },
      ratio () {
        if (this.dataFirst && this.dataSecond) {
          const biggest = Math.max(this.dataFirst.total, this.dataSecond.total)
          return {first: this.dataFirst.total / biggest, second: this.dataSecond.total / biggest}
        } else {
          return {first: 1, second: 1}
        }
      },
      comparing () {
        return this.$store.getters.isComparing()
      },
      isSmallScreen () {
        return this.$store.getters.isTablet()
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
      font-size: 18px !important;
    }

    @media only screen and (max-width: 992px) {
      margin: 1em 0
    }
  }

  .content .highlight,
  .highlight {
    color: $color__primary--base;
    font-family: $font__family--sans--especial;
    font-size: 12px;
    letter-spacing: 0.035em;
    font-weight: bold;
    margin-top: 2em;
  }

  .Proposal {
    &__left {
      border-right: 1px solid #fff;
    }
    &__right {
      border-left: 1px solid #fff;
    }

    > div:last-child {
      height: calc(100% - 66px);
    }
  }

  .possible_votes {
    font-family: 'Roboto Condensed', 'Roboto', sans-serif;
    font-size: 14px;

    strong {
      font-family: $font__family--sans;
      font-weight: bold;
      color: $color__primary--base;
    }
  }

  .container {
    position: relative;
  }
</style>
