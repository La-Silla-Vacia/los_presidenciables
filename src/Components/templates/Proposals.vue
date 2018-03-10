<template>
  <div>
    <SelectBar :items="themes">
      <Button :absolute="true" @click="handleCompareClick">COMPARAR</Button>
    </SelectBar>
    <Container type="sidebar">
      <ThumbBar/>
      <Paper :data="candidate"/>
    </Container>
  </div>
</template>

<script>
  import Container from "../atoms/Container"
  import SelectBar from "../molecules/SelectBar"
  import Button from "../atoms/Button"
  import ThumbBar from "../molecules/ThumbBar"
  import Paper from "../molecules/Paper"

  export default {
    name: "Proposals",
    components: {
      Container,
      SelectBar,
      Button,
      ThumbBar,
      Paper
    },
    methods: {
      handleCompareClick() {

      }
    },
    computed: {
      themes() {
        return this.$store.getters.getThemes()
      },
      candidates() {
        return this.$store.getters.getCandidates()
      },
      candidate() {
        const candidate = this.$route.params.uid
        const candidateName = this.$store.getters.getCandidateByUid(candidate)
        return this.$store.getters.getAnswersByCandidate(candidateName.name)
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';
</style>
