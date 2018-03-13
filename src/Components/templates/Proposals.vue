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
        <ThumbSelect which="first"/>
        <Paper :data="compareFirst" :compact="true"/>
      </div>
      <div v-if="comparing" :class="[$style.Proposal, $style.Proposal__right]">
        <ThumbSelect which="second"/>
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
    computed: {
      themes () {
        return this.$store.getters.getThemes()
      },
      candidates () {
        return this.$store.getters.getCandidates()
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
</style>
