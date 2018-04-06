<template>
  <div ref="root" :class="[$style.root, {[$style.compact]: compact}]">
    <div v-for="item in candidateAnswers" :id="item.theme.replace(/[^a-z0-9]/gi, '_').toLowerCase()" :key="item.theme"
         :class="$style.section">
      <div :class="$style.title" tabindex="0">{{item.theme}}</div>
      <p
        v-for="(answer, index) in item.answers"
        v-if="answer.summary"
        :key="answer + index"
        :class="$style.answer"
      >
        {{answer.summary}}
      </p>
      <p v-else>
        Sin definir
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Paper',
    props: [
      'data',
      'compact'
    ],
    mounted () {
      this.scrollToHash()
    },
    methods: {
      scrollToHash () {
        const currentTheme = this.$store.getters.getActiveTheme()
        const themeHash = currentTheme.replace(/[^a-z0-9]/gi, '_').toLowerCase()
        const offset = this.compact ? 100 : 50
        const id = this.$route.hash ? this.$route.hash : '#' + themeHash
        const location = this.$refs.root.querySelector(id)
        if (location) {
          this.$refs.root.scrollTop = location.offsetTop - offset
        }
      }
    },
    computed: {
      candidateAnswers () {
        const candidate = this.data
        return this.$store.getters.getAnswersByCandidate(candidate.name)
      }
    },
    watch: {
      $route (to, from) {
        if (to.hash !== from.hash) {
          this.scrollToHash()
        }
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    padding: 3em 2em;
    background-color: #fff;
    margin: 20px auto;
    max-width: 720px;
    width: 100%;
    max-height: $max-content-height;
    overflow: auto;
  }

  .compact {
    max-width: 543px;
    max-height: $max-content-height - 106px;
  }

  .title {
    color: $color__primary--base;
    font-size: 14px;
    font-family: $font__family--sans--especial;
    text-transform: uppercase;
  }

  .section {
    max-width: 537px;
    width: 100%;
    margin: 0 auto 2em;
    padding-bottom: 2em;
    border-bottom: 1px solid rgba(0, 0, 0, .25);
  }

  .section p {
    font-size: 14px;
    letter-spacing: 0.035em;
    line-height: 2;
    font-weight: normal;
    position: relative;
    margin: 0;

    &::before {
      content: '';
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 8px solid $color__primary--base;
      position: absolute;
      top: 9px;
      left: -16px;
    }
  }
</style>
