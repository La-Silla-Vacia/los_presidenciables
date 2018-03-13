<template>
  <div>
    <SelectBar :items="themes">
      <Button :absolute="true" @click="handleCompareClick">COMPARAR</Button>
    </SelectBar>
    <Container :type="comparing ? 'comparing' : 'sidebar'">
      <ThumbBar v-if="!comparing"/>
      <div :class="[$style.Proposal, $style.Proposal__left]">
        <Paper :data="candidate" :compact="comparing" />
      </div>
      <div v-if="comparing" :class="[$style.Proposal, $style.Proposal__right]">
        <Paper :data="candidate" :compact="comparing" />
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
  import Paper from '../molecules/Paper'

  export default {
    name: 'Proposals',
    components: {
      Container,
      SelectBar,
      Button,
      ThumbBar,
      Paper
    },
    methods: {
      handleCompareClick () {
        this.$store.commit(types.RECEIVE_COMPARE, !this.comparing)
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
        const candidateName = this.$store.getters.getCandidateByUid(candidate)
        return this.$store.getters.getAnswersByCandidate(candidateName.name)
      },
      comparing () {
        return this.$store.getters.isComparing()
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
