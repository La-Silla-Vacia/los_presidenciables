<template>
  <Card :class="$style.root" :isInActive="!question">
    <User
      :name="data.name"
      :partido="data.partido"
      :photo="data.foto || undefined"
    >
      <Button v-if="question" :large="true">{{question.answer}}</Button>
    </User>
    <Hr />
    <vue-markdown v-if="question" :source="question.summary" />
    <div v-if="question" :class="$style.footer">
      <a :href="question.link" :class="$style.link" target="_blank">
        <svg width="11" height="12" viewBox="0 0 11 12">
          <polygon fill="currentColor"
                   transform="translate(5.899495, 5.899495) rotate(-45.000000) translate(-5.899495, -5.899495) "
                   points="5.89949494 -1.10050506 4.67449494 0.124494937 9.57449494 5.02449494 -1.10050506 5.02449494 -1.10050506 6.77449494 9.57449494 6.77449494 4.67449494 11.6744949 5.89949494 12.8994949 12.8994949 5.89949494"></polygon>
        </svg>
        VER DETALLE DE PROPUESTA
      </a>
    </div>
  </Card>
</template>

<script>
  import VueMarkdown from 'vue-markdown'

  import Card from '../atoms/Card'
  import User from '../molecules/User'
  import Button from '../atoms/Button'
  import Hr from '../atoms/Hr'

  export default {
    name: 'AnswerCard',
    props: [
      'data'
    ],
    mounted () {
    },
    components: {
      VueMarkdown,
      Card,
      User,
      Button,
      Hr
    },
    computed: {
      question () {
        return this.$store.getters.getAnswerByCandidate(this.data.name)
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

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

  .footer {
    margin-top: auto;
  }
</style>
