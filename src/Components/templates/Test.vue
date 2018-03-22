<template>
  <div>
    <Bar title="¿Quién es su candidato?"/>
    <Container type="comparing">
      <div :class="$style.image"/>
      <div :class="$style.content">
        <div :class="$style.intro" v-if="questionIndex === null">
          <img src="../../assets/images/quien_avatar.png" width="100" alt=""/>
          <div :class="$style.title">Quién es su candidato?</div>
          <div :class="$style.introduction">Conozca quien sería su candidato según su caracter</div>
          <Button :class="$style.button" @click="questionIndex = 0" type="ghost--bordered">COMENZAR</Button>
        </div>

        <div :class="$style.intro" v-else-if="answers.length >= test.length">
          <div :class="$style.intro">Por su caracter su candidato es:</div>
          <div :class="[$style.title, $style.result]">Germán Vargas Lleras</div>

          <div :class="$style.buttons">
            <Button :class="$style.button" type="ghost--bordered">HUY NO!</Button>
            <Button :class="$style.button" type="ghost--bordered">ME GUSTA!</Button>
          </div>
        </div>

        <div :class="$style.question" v-else>
          <div :class="$style.header">
            {{questionIndex + 1}}
            <button
              :class="$style.next"
              @click.prevent="handleNext"
            >
            </button>
          </div>
          <form :class="$style.question__container">
            <div :class="$style.question__title">{{question.question}}</div>
            <div :class="$style.question__options">
              <div v-for="(answer, index) in question.answers">
                <input
                  name="answer"
                  v-model="answers[questionIndex]"
                  :value="index"
                  :class="$style.question__input"
                  type="radio"
                  :id="`answer-${index}`"
                />
                <label :for="`answer-${index}`" :class="$style.question__label"><span/> {{answer.answer}}</label>
              </div>
            </div>
            <transition name="fade">
              <button
                v-if="answers[questionIndex] !== undefined"
                @click.prevent="handleNext"
                :class="[$style.next, $style.continue]"
              >
              </button>
            </transition>
          </form>
          <div :class="$style.footer">
            <button
              v-for="(question, index) in test"
              :key="question.question + index"
              @click="questionIndex = index"
              :disabled="answers.length < index"
              :class="[
                $style.indicator,
                {[$style.indicator__active]: index === questionIndex}
              ]"
            ></button>
          </div>
        </div>
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
    methods: {
      handleNext () {
        if (this.questionIndex + 1 >= this.test.length) {
          console.log('nooo')
        } else {
          this.questionIndex += 1
        }
      }
    },
    computed: {
      test () {
        return this.$store.getters.getTest()
      },
      question () {
        return this.test[this.questionIndex]
      }
    },
    data () {
      return {
        questionIndex: 0,
        answers: [0, 0, 0, 0, 0, 1]
      }
    }
  }
</script>

<style module lang="scss">
  @import "../../assets/styles/base";

  .content {
    padding: 45px 25px 0 65px;
  }

  .intro,
  .question {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100%;
  }

  .intro {
    text-align: center;
    justify-content: center;
  }

  .question {
    justify-content: space-between;
    align-items: flex-start;
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

  .result {
    font-size: 40px;
    margin-bottom: 0;
  }

  .button {
    margin: 30px 10px;
    padding: 0.75em 3em;
  }

  .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: $color__primary--base;
    font-size: 40px;
    font-weight: lighter;
    margin-bottom: 30px;
    line-height: 1;
  }

  .next {
    background: url('../../assets/images/arrow-right.svg') no-repeat right top;
    background-size: 20px;
    width: 20px;
    height: 20px;
    padding: 20px;
    border: 0;
    transition: transform .3s ease;

    &:focus {
      outline: none;
      transform: translateX(1em);
    }
  }

  .question__container {
    margin-bottom: 30px;
    position: relative;
  }

  .question__title {
    font-size: 22px;
    margin-bottom: 20px;
  }

  .question__options {
    border-left: 1px solid #B1B9BD;
    padding-left: 20px;
  }

  .question__input {
    display: none;
  }

  .question__label {
    display: block;
    font-weight: normal;
  }

  .question__label span {
    display: inline-block;
    width: 1em;
    height: 1em;
    background-color: #fff;
    border: 1px solid #707070;
    border-radius: 50%;
    position: relative;
    margin: -0.2em 0.25em 0 0;
    vertical-align: middle;
  }

  .question__input:checked + label span::before {
    content: '';
    width: 80%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #707070;
    border-radius: 50%;
  }

  .footer {
    margin: 4em auto 1em;
    text-align: center;
  }

  .indicator {
    width: 16px;
    height: 16px;
    border: 1px solid $color__primary--base;
    padding: 0;
    border-radius: 50%;
    background: transparent;
    margin: 8px;
  }

  .indicator__active {
    background-color: $color__primary--base;
  }

  .continue {
    position: absolute;
    bottom: -50px;
    padding-left: 21px;
  }
</style>
