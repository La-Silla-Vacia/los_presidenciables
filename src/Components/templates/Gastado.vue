<template>
  <div>
    <Bar title="¿Cómo gastan el presupuesto los candidatos?"/>
    <Container :type="comparing ? 'comparing' : 'sidebar'">
      <ThumbBar routeBase="/gastado/"/>

      <div :class="$style.content">
        <div :class="$style.row">
          <div :class="$style.bar">
            <div :class="$style.num">$0</div>
            <div :class="$style.percentage">0%</div>
            <div :class="$style.line">
              <div :class="$style.line__inner" style="width: 0%"></div>
            </div>
            <div :class="$style.num">$?</div>
          </div>

          <div :class="[$style.bar, $style['bar--details']]">
            <RadialProgress percentage="0" title="Vallas" />
            <RadialProgress percentage="0" title="Propagandas en radio nacional" />
            <RadialProgress percentage="0" title="Propagandas en TV nacional" />
            <RadialProgress percentage="0" title="Propagandas en prensa nacional" />
            <RadialProgress percentage="0" title="Propagandas en prensa local" />
            <RadialProgress percentage="0" title="Viajes" />
          </div>
        </div>

        <div :class="$style.cta">
          ¿Tiene información sobre los gastos?
          <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSd3U9MTHvM5olE4s_oEOKsqaBeQuZloVnWPys6EEcvuuj6IHQ/viewform">Ayúdenos a reportarlos aquí</a>
        </div>
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
  import RadialProgress from '../atoms/RadialProgess'

  export default {
    name: 'Gastado',
    components: {
      Container,
      Bar,
      Button,
      ThumbBar,
      RadialProgress
    },
    methods: {
      handleCompareClick (state) {
        this.$store.commit(types.RECEIVE_COMPARE, {active: state, first: this.candidate})
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
      }
    },
    data () {
      return {}
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .content {
    width: calc(100% - 15em);
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

  .row {
    background-color: #fff;
    width: 100%;
  }

  .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
    padding: 24px 30px;
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

  .cta {
    width: 180px;
    padding: 15px;
    color: #fff;
    background-color: $color__primary--base;
    position: absolute;
    right: 0;
    top: 64px;
    font-size: 14px;
    font-weight: 600;
    font-family: $font__family--sans--especial;
    text-align: center;

    & a {
      color: #fff;
      font-size: 12px;
      font-weight: normal;
      text-decoration: underline;
      margin-top: 10px;
    }
  }
</style>
