<template>
  <div :class="$style.root">
    <SelectBar :with-question="true" :items="themes">
      <!--<Button :absolute="true" @click="handleCompareClick">COMPARAR</Button>-->
      <div :class="$style.credits">
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Logo_Bancolombia.svg" alt="Bancolombia"/>
        <p>apoyó esta herramienta educativa para que los ciudadanos voten informados. Ésta no representa una
          posición institucional
        </p>
      </div>
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
  }

  .credits {
    width: 20em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    justify-self: flex-end;
    margin-left: auto;
    position: absolute;
    right: 15px;
  }

  .credits img {
    width: 128px;
    display: block;
  }

  .credits p {
    font-family: 'Roboto Condensed', 'Roboto', sans-serif;
    font-size: 10px !important;
    margin: 0.5em 0 0 1em;
    line-height: 1;
    text-align: left;
  }

  @media screen and (max-width: 1180px) {
    .credits {
      position: relative;
    }
  }

  @media screen and (max-width: 930px) {
    .credits {
      width: 98%;
      right: inherit;
      margin-bottom: .25em;
      max-width: 20em;
      margin-right: auto;
    }
  }
</style>
