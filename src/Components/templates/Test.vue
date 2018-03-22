<template>
  <div>
    <Bar title="¿Quién es su candidato?"/>
    <Container type="comparing">
      <div :class="$style.image"/>
      <div :class="$style.content">
        <img src="../../assets/images/quien_avatar.png" width="100" alt=""/>
        <div :class="$style.title">Quién es su candidato?</div>
        <div :class="$style.introduction">Conozca quien sería su candidato según su caracter</div>
        <Button :class="$style.button" type="ghost--bordered">COMENZAR</Button>
      </div>

    </Container>
  </div>
</template>

<script>
  import Container from '../atoms/Container'
  import Bar from '../atoms/Bar'
  import Button from '../atoms/Button'

  export default {
    name: 'Test',
    components: {
      Container,
      Bar,
      Button
    },
    methods: {},
    computed: {
      data () {
        return this.$store.getters.getMaquinaria(this.candidate.name)
      }
    }
  }
</script>

<style module lang="scss">
  @import "../../assets/styles/base";

  .content {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .image {
    background-image: url('../../assets/images/blur_photo.png');
    background-size: cover;
  }

  .title {
    font-size: 30px;
    margin: 40px 0 30px;
  }

  .introduction {
    max-width: 16em;
  }

  .button {
    margin-left: inherit;
    margin-top: 30px;
    padding: 0.75em 3em;
  }
</style>
