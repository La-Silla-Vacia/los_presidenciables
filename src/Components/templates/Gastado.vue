<template>
  <div>
    <Bar title="¿Cómo gastan el presupuesto los candidatos?">
      <Button v-if="!comparing && isSingle && !isSmallScreen" :absolute="true" @click="handleCompareClick(true)">
        COMPARAR
      </Button>
      <Button v-else-if="isSingle && !isSmallScreen" type="ghost" :absolute="true" @click="handleCompareClick(false)">
        <img src="../../assets/images/close.svg" width="8"/>
        CLOSE
      </Button>
    </Bar>
    <Container type="full">
      <div
        v-if="!comparing"
        :class="$style.content"
      >
        <div :class="$style.cta">
          <small>Acá iremos sumando los gastos con la información que ustedes nos envíen, para hacerle una veeduría a
            las campañas
          </small>
          <div :class="$style.cta__inner">
            ¿Tiene información sobre los gastos?
            <a target="_blank"
               href="https://docs.google.com/forms/d/e/1FAIpQLSd3U9MTHvM5olE4s_oEOKsqaBeQuZloVnWPys6EEcvuuj6IHQ/viewform">Ayúdenos
              a reportarlos aquí</a>
          </div>
        </div>

        <SpendingsRow
          v-for="candidate in candidates"
          :key="candidate"
          :class="$style.row"
          :candidate="candidate"
        ></SpendingsRow>
      </div>


      <div v-if="comparing" :class="[$style.Proposal, $style.Proposal__left]">
        <ThumbSelect which="first"></ThumbSelect>
        <div :class="[$style.bar, $style['bar--details']]" style="background-color: #fff; margin: 1em 0">
          <RadialProgress
            v-for="item in data(candidate.name)"
            :key="item.tipoDeGasto"
            percentage="0"
            :title="item.tipoDeGasto"
          ></RadialProgress>
        </div>
      </div>
      <div v-if="comparing" :class="[$style.Proposal, $style.Proposal__right]">
        <ThumbSelect which="second"></ThumbSelect>
        <div :class="[$style.bar, $style['bar--details']]" style="background-color: #fff; margin: 1em 0">
          <RadialProgress
            v-for="item in data(candidate.name)"
            :key="item.tipoDeGasto"
            percentage="0"
            :title="item.tipoDeGasto"
          ></RadialProgress>
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
  import ThumbSelect from '../molecules/ThumbSelect'
  import RadialProgress from '../atoms/RadialProgess'
  import SpendingsRow from '../molecules/SpendingsRow'

  export default {
    name: 'Gastado',
    components: {
      Container,
      Bar,
      Button,
      ThumbBar,
      ThumbSelect,
      RadialProgress,
      SpendingsRow
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
    computed: {
      candidate () {
        const candidate = this.$route.params.uid
        return this.$store.getters.getCandidateByUid(candidate)
      },
      candidates () {
        return this.$store.getters.getCandidates()
      },
      comparing () {
        return this.$store.getters.isComparing()
      },
      isSingle () {
        return this.$route.params.uid
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
  @import '../../assets/styles/base';

  .content {
    width: calc(100% - 1em);
    margin: 1em 0 0 0;

    @media only screen and (min-width: 992px) {
      width: calc(100% - 15em);
      margin: 0 0 0 2em;
    }

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

  .cta {
    width: 218px;
    position: absolute;
    right: 0;
    top: 40px;
    font-size: 14px;
    font-weight: 600;
    font-family: $font__family--sans--especial;

    & a {
      color: #fff;
      font-size: 12px;
      font-weight: normal;
      text-decoration: underline;
      margin-top: 10px;
    }

    .cta__inner {
      padding: 15px;
      color: #fff;
      background-color: $color__primary--base;
      text-align: center;
      margin-top: 1em;
    }

    @media only screen and (max-width: 992px) {
      width: 100%;
      max-width: 300px;
      position: relative;
      top: inherit;
      margin-bottom: 1.5em;
      margin-left: auto;
    }
  }

  .Proposal {
    &__left {
      border-right: 1px solid #fff;
    }
    &__right {
      border-left: 1px solid #fff;
    }
  }
</style>
