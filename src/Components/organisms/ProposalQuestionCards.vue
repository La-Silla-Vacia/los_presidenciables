<template>
  <div :class="$style.root">
    <SelectBar :items="themes">
      <Button :absolute="true" @click="handleCompareClick">COMPARAR</Button>
    </SelectBar>
    <Container>
      <AnswerCard
        v-for="candidate in candidates"
        :key="candidate.name"
        :candidate="candidate"
        :theme="themes.active"
      />
    </Container>
  </div>
</template>

<script>
  import SelectBar from '../molecules/SelectBar'
  import Button from '../atoms/Button'
  import Container from '../atoms/Container'
  import AnswerCard from '../molecules/AnswerCard'

  export default {
    name: 'ProposalQuestionCards',
    components: {
      SelectBar,
      Button,
      Container,
      AnswerCard
    },
    methods: {
      handleCompareClick () {
        console.log('compare click')
      }
    },
    computed: {
      themes () {
        return this.$store.getters.getThemes()
      },
      question () {
        return this.$store.getters.getQuestionByTheme()
      },
      candidates () {
        return this.$store.getters.getCandidates()
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    width: 100%;
    height: 100%;
    position: relative;
    padding-bottom: 2em;
  }
</style>
