<template>
  <div>
    <SelectBar :items="themes">
      <Button v-if="!comparing" :absolute="true" @click="handleCompareClick(true)">COMPARAR</Button>
      <Button v-else type="ghost" :absolute="true" @click="handleCompareClick(false)">
        <img src="../../assets/images/close.svg" width="8"/>
        CLOSE
      </Button>
    </SelectBar>
    <Container :type="comparing ? 'comparing' : 'sidebar'">
      <ThumbBar v-if="!comparing"/>
      <Paper v-if="!comparing" :data="candidate"/>
      <div v-if="comparing" :class="[$style.Proposal, $style.Proposal__left]">
        <ThumbSelect which="first">
          <a v-if="getFirstLink" :href="getFirstLink" :class="$style.link">
            <svg width="11" height="12" viewBox="0 0 11 12">
              <polygon fill="currentColor"
                       transform="translate(5.899495, 5.899495) rotate(-45.000000) translate(-5.899495, -5.899495) "
                       points="5.89949494 -1.10050506 4.67449494 0.124494937 9.57449494 5.02449494 -1.10050506 5.02449494 -1.10050506 6.77449494 9.57449494 6.77449494 4.67449494 11.6744949 5.89949494 12.8994949 12.8994949 5.89949494"></polygon>
            </svg>
            VER DETALLE DE PROPUESTA
          </a>
        </ThumbSelect>
        <Paper :data="compareFirst" :compact="true"/>
      </div>
      <div v-if="comparing" :class="[$style.Proposal, $style.Proposal__right]">
        <ThumbSelect which="second">
          <a v-if="getSecondLink" :href="getSecondLink" :class="$style.link">
            <svg width="11" height="12" viewBox="0 0 11 12">
              <polygon fill="currentColor"
                       transform="translate(5.899495, 5.899495) rotate(-45.000000) translate(-5.899495, -5.899495) "
                       points="5.89949494 -1.10050506 4.67449494 0.124494937 9.57449494 5.02449494 -1.10050506 5.02449494 -1.10050506 6.77449494 9.57449494 6.77449494 4.67449494 11.6744949 5.89949494 12.8994949 12.8994949 5.89949494"></polygon>
            </svg>
            VER DETALLE DE PROPUESTA
          </a>
        </ThumbSelect>
        <Paper v-if="compareSecond" :data="compareSecond" :compact="true"/>
      </div>
    </Container>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'

  import Container from '../atoms/Container'
  import SelectBar from '../molecules/SelectBar'
  import Button from '../atoms/Button'
  import ThumbBar from '../molecules/ThumbBar'
  import ThumbSelect from '../molecules/ThumbSelect'
  import Paper from '../molecules/Paper'

  export default {
    name: 'Proposals',
    components: {
      Container,
      SelectBar,
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
      themes () {
        return this.$store.getters.getThemes()
      },
      candidate () {
        const candidate = this.$route.params.uid
        return this.$store.getters.getCandidateByUid(candidate)
      },
      comparing () {
        return this.$store.getters.isComparing()
      },
      compareFirst () {
        return this.$store.getters.isComparing('first')
      },
      compareSecond () {
        return this.$store.getters.isComparing('second')
      },
      getFirstLink () {
        const candidateAnswers = this.$store.getters.getAnswerByCandidate(this.compareFirst.name)
        if (candidateAnswers) {
          return candidateAnswers.link
        }
      },
      getSecondLink () {
        if (!this.compareSecond) return
        const candidateAnswers = this.$store.getters.getAnswerByCandidate(this.compareSecond.name)
        if (candidateAnswers) {
          return candidateAnswers.link
        }
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .Proposal {
    border: 0 solid #fff;

    &__left {
      border-right-width: 1px;
    }

    &__right {
      border-left-width: 1px;
    }
  }

  .link {
    color: $color__primary--base;
    font-size: 9px;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .link svg {
    margin-right: 0.5em;
  }
</style>
