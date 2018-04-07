<template>
  <div ref="root" :class="[$style.root, {[$style.compact]: compact}]">
    <div v-for="item in candidateAnswers" :id="item.theme.replace(/[^a-z0-9]/gi, '_').toLowerCase()" :key="item.theme"
         :class="$style.section">
      <div :class="$style.title" tabindex="0">{{item.theme}}</div>
      <div
        v-for="(answer, index) in item.answers"
        v-if="answer.summary"
        :key="answer + index"
        :class="$style.answer"
        v-html="toMarkdown(answer.summary)"
      >
      </div>
      <div v-else :class="$style.answer">
        <p>
          Sin definir
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import MarkdownIt from 'markdown-it'

  const md = new MarkdownIt()

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
        if (!this.$refs.root) return
        const location = this.$refs.root.querySelector(id)
        const paragraphs = this.$refs.root.querySelectorAll('p, li')
        if (location) {
          this.$refs.root.scrollTop = location.offsetTop - offset

          for (let i = 0; i < paragraphs.length; i += 1) {
            paragraphs[i].classList.remove(this.$style.active)
          }

          const locationParagraphs = location.querySelectorAll('p, li')
          console.log(locationParagraphs)
          for (let i = 0; i < locationParagraphs.length; i += 1) {
            locationParagraphs[i].classList.add(this.$style.active)
          }
        }
      },
      toMarkdown (data) {
        return md.render(data)
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

  .answer,
  .answer p {
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

  .active {
    background-color: rgba(242, 248, 80, .25)
  }

  .answer p {
    margin-bottom: 1em;
  }

  .answer ul {
    padding-left: 1em;
  }
</style>
