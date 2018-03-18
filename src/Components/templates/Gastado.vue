<template>
  <div>
    <Bar title="¿Cómo gastan el presupuesto los candidatos?" />
    <Container :type="comparing ? 'comparing' : 'sidebar'">
      <ThumbBar routeBase="/gastado/"/>

      <div :class="$style.content">
        <p>No data yet</p>

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

  export default {
    name: 'Gastado',
    components: {
      Container,
      Bar,
      Button,
      ThumbBar,
      ThumbSelect,
      Paper
    },
    methods: {
      handleCompareClick (state) {
        this.$store.commit(types.RECEIVE_COMPARE, {active: state, first: this.candidate})
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
      return {
        chartData: {
          label: 'root',
          children: [
            {
              label: 'child 1',
              children: [
                {
                  label: 'child 1-1',
                  size: 10
                },
                {
                  label: 'child 1-2',
                  children: [
                    {
                      label: 'child 1-2-1',
                      size: 5
                    },
                    {
                      label: 'child 1-3-1',
                      size: 8
                    }
                  ]
                },
                {
                  label: 'child 1-3',
                  children: [
                    {
                      label: 'child 1-3-1',
                      children: [
                        {
                          label: 'child 1-3-1-1',
                          size: 2
                        },
                        {
                          label: 'child 1-3-1-2',
                          size: 5
                        }
                      ]
                    },
                    {
                      label: 'child 1-3-2',
                      size: 8
                    }
                  ]
                }
              ]
            },
            {
              label: 'child 2',
              size: 25
            }
          ]
        }
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

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
