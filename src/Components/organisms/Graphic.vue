<template>
  <div :class="$style.root">
    <Header />
    <SelectBar :items="themes">
      <Button :absolute="true" @click={handleCompareClick}>COMPARAR</Button>
    </SelectBar>
    <Container>
      <Card v-for="item in items" :key="item">
        <User
          :name="item.candidate"
          partido="COMPROMISO CIUDADANO"
          :label="item.answer"
        />
        <Hr />
        <p v-html="item.summary" />
        <footer>
          <a href='/' :class="$style.link" target="_blank">
            <svg width="11" height="12" viewBox="0 0 11 12">
              <polygon fill="currentColor"
                       transform="translate(5.899495, 5.899495) rotate(-45.000000) translate(-5.899495, -5.899495) "
                       points="5.89949494 -1.10050506 4.67449494 0.124494937 9.57449494 5.02449494 -1.10050506 5.02449494 -1.10050506 6.77449494 9.57449494 6.77449494 4.67449494 11.6744949 5.89949494 12.8994949 12.8994949 5.89949494"></polygon>
            </svg>
            VER DETALLE DE PROPUESTA
          </a>
        </footer>
      </Card>
    </Container>
  </div>
</template>

<script>
  import Header from '../molecules/Header'
  import SelectBar from '../molecules/SelectBar'
  import Button from '../atoms/Button'
  import Container from '../atoms/Container'
  import Card from '../molecules/Card'
  import User from '../molecules/User'

  export default {
    name: 'Graphic',
    components: {
      Header,
      SelectBar,
      Button,
      Container,
      Card,
      User
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
      items () {
        return [
          'hoi'
        ]
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

  .link {
    color: $color__primary--base;
    font-size: 9px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  .link svg {
    margin-right: 0.5em;
  }
</style>
