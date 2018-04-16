<template>
  <Card :isInActive="!question">
    <User
      :name="candidate.name"
      :partido="candidate.partido"
      :photo="candidate.foto || undefined"
    >
      <Button v-if="question" :large="true">{{question.answer.split('.')[0]}}</Button>
    </User>
    <Hr />
    <p v-if="question" v-html="answer" />
    <div v-if="question" :class="$style.footer">
      <router-link :to="`/proposals/${candidate.id}#${theme.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`" :class="$style.link">
        <svg width="11" height="12" viewBox="0 0 11 12">
          <polygon fill="currentColor"
                   transform="translate(5.899495, 5.899495) rotate(-45.000000) translate(-5.899495, -5.899495) "
                   points="5.89949494 -1.10050506 4.67449494 0.124494937 9.57449494 5.02449494 -1.10050506 5.02449494 -1.10050506 6.77449494 9.57449494 6.77449494 4.67449494 11.6744949 5.89949494 12.8994949 12.8994949 5.89949494"></polygon>
        </svg>
        VER DETALLE DE PROPUESTA
      </router-link>
    </div>
  </Card>
</template>

<script>
  import Card from '../atoms/Card'
  import User from '../molecules/User'
  import Button from '../atoms/Button'
  import Hr from '../atoms/Hr'

  export default {
    name: 'AnswerCard',
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
      },
      answer () {
        if (!this.question) return
        let arr = this.question.answer.split('.')
        arr.shift()
        return arr.join('.')
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
