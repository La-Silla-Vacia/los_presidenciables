<template>
  <div :class="$style.root" :isInActive="!question">
    Bar
  </div>
</template>

<script>
  import Card from '../atoms/Card'
  import User from '../molecules/User'
  import Button from '../atoms/Button'
  import Hr from '../atoms/Hr'

  export default {
    name: 'ThumbBar',
    props: [
      'candidate',
      'theme'
    ],
    mounted () {
    },
    components: {
      Card,
      User,
      Button,
      Hr
    },
    computed: {
      question () {
        return this.$store.getters.getAnswerByCandidate(this.candidate.name)
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {

  }
</style>
