<template>
  <div>
    <Bar title="¿Quién es su candidato?"/>
    <Container type="comparing">
      <div v-if="answers.length >= test.length" :class="$style.image">
        <img :src="result[result.length - 1].photo" alt=""/>
      </div>
      <div v-else-if="result.length" :class="$style.image">
        <img
          v-for="res in result"
          :key="res.name"
          :src="res.photo"
          :style="{opacity: res.opacity}"
          alt=""
        />
      </div>
      <div v-else :class="$style.image">
        <img src="../../assets/images/blur_photo.png" alt=""/>
      </div>
      <div :class="$style.content">
        <div :class="$style.intro" v-if="questionIndex === null">
          <img src="../../assets/images/quien_avatar.png" width="100" alt=""/>
          <div :class="$style.title">Quién es su candidato?</div>
          <div :class="$style.introduction">Conozca quien sería su candidato según su caracter</div>
          <Button :class="$style.button" @click="questionIndex = 0" type="ghost--bordered">COMENZAR</Button>
        </div>

        <div :class="$style.intro" v-else-if="answers.length >= test.length">
          <div :class="$style.intro">Por su caracter su candidato es:</div>
          <div :class="[$style.title, $style.result]">{{result[result.length - 1].name}}</div>

          <div :class="$style.buttons">
            <Button :class="$style.button"
                    to="https://www.facebook.com/sharer/sharer.php?u=http://lasillavacia.com/elecciones2018"
                    type="ghost--bordered">Uy, no
            </Button>
            <Button :class="$style.button"
                    to="https://www.facebook.com/sharer/sharer.php?u=http://lasillavacia.com/elecciones2018"
                    type="ghost--bordered">¡Me gusta!
            </Button>
          </div>

          <Button :class="$style.button" type="small" @click="showResults = !showResults">{{showResults
            ?'OCULTAR' : 'VER' }} COMO VAN LOS DEMÁS RESULTADOS
          </Button>
          <table v-if="showResults" style="text-align: left; margin-bottom: 4em">
            <thead>
            <tr>
              <th>Posición</th>
              <th>Tu elección</th>
              <th>{{result[result.length - 1].name}}</th>
            </tr>
            </thead>
            <tr v-for="(answer, index) in answers">
              <td>{{test[index].question}}</td>
              <td>{{test[index].answers[answer].answer}}</td>
              <td><img :src="getResultImage(index, answer)" width="20"/></td>
            </tr>
          </table>
        </div>

        <div :class="$style.question" v-else>
          <div :class="$style.header">
            {{questionIndex + 1}}
            <button
              v-if="answers[questionIndex] !== undefined"
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

  const german = [
    require('../../assets/images/candidatos/german1.jpg'),
    require('../../assets/images/candidatos/german2.jpg'),
    require('../../assets/images/candidatos/german3.jpg'),
    require('../../assets/images/candidatos/german4.jpg')
  ]

  const gustavo = [
    require('../../assets/images/candidatos/gustavo1.jpg'),
    require('../../assets/images/candidatos/gustavo2.jpg'),
    require('../../assets/images/candidatos/gustavo3.jpg'),
    require('../../assets/images/candidatos/gustavo4.jpg')
  ]

  const humberto = [
    require('../../assets/images/candidatos/humberto1.jpg'),
    require('../../assets/images/candidatos/humberto2.jpg'),
    require('../../assets/images/candidatos/humberto3.jpg'),
    require('../../assets/images/candidatos/humberto4.jpg')
  ]

  const ivan = [
    require('../../assets/images/candidatos/ivan1.jpg'),
    require('../../assets/images/candidatos/ivan2.jpg'),
    require('../../assets/images/candidatos/ivan3.jpg'),
    require('../../assets/images/candidatos/ivan4.jpg')
  ]

  const piedad = [
    require('../../assets/images/candidatos/piedad1.jpg'),
    require('../../assets/images/candidatos/piedad2.jpg'),
    require('../../assets/images/candidatos/piedad3.jpg'),
    require('../../assets/images/candidatos/piedad4.jpg')
  ]

  const sergio = [
    require('../../assets/images/candidatos/sergio1.jpg'),
    require('../../assets/images/candidatos/sergio2.jpg'),
    require('../../assets/images/candidatos/sergio3.jpg'),
    require('../../assets/images/candidatos/sergio4.jpg')
  ]

  const viviane = [
    require('../../assets/images/candidatos/viviane1.jpg'),
    require('../../assets/images/candidatos/viviane2.jpg'),
    require('../../assets/images/candidatos/viviane3.jpg'),
    require('../../assets/images/candidatos/viviane4.jpg')
  ]

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
      },
      getResultImage (index, answer) {
        const isInArray = this.test[index].answers[answer].who.indexOf(this.result[this.result.length - 1].name) !== -1
        return isInArray ? require('../../assets/images/check.svg') : require('../../assets/images/close.svg')
      }
    },
    computed: {
      testData () {
        return this.$store.getters.getTest()
      },
      test () {
        return this.testData.qa
      },
      question () {
        return this.test[this.questionIndex]
      },
      result () {
        const stage = (this.questionIndex + 1) * 100 / this.test.length
        let stageNum = 0
        if (this.answers.length >= this.test.length) {
          stageNum = 3
        } else if (stage >= 33.3333 && stage <= 66.6665) {
          stageNum = 1
        } else if (stage >= 66.6666) {
          stageNum = 2
        }

        let people = []
        this.answers.map((answer, index) => {
          const who = this.test[index].answers[answer].who
          people = people.concat(who)
        })

        const counts = {}
        people.forEach(function (x) {
          counts[x] = (counts[x] || 0) + 1
        })
        const order = Object.keys(counts).sort(function (a, b) {
          return counts[a] - counts[b]
        })

        let totalCounts = 0
        for (let i = 0; i < order.length; i += 1) {
          totalCounts += counts[order[i]]
        }

        return order.map(person => {
          let photo = null
          switch (person) {
            case ('Germán Vargas Lleras'):
              photo = german[stageNum]
              break
            case ('Gustavo Petro'):
              photo = gustavo[stageNum]
              break
            case ('Humberto de la Calle'):
              photo = humberto[stageNum]
              break
            case ('Iván Duque'):
              photo = ivan[stageNum]
              break
            case ('Piedad Córdoba'):
              photo = piedad[stageNum]
              break
            case ('Sergio Fajardo'):
              photo = sergio[stageNum]
              break
            case ('Viviane Morales'):
              photo = viviane[stageNum]
              break
          }

          return {
            name: person,
            amount: counts[person],
            opacity: counts[person] / totalCounts,
            photo: photo
          }
        })
      }
    },
    data () {
      return {
        questionIndex: null,
        answers: [],
        showResults: false
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
    position: relative;
    overflow: hidden;

    img {
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
      width: auto;
      max-width: inherit;
      min-height: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
    }
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

  .buttons {
    display: flex;
    align-items: center;
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
    padding-left: 1.5em;
  }

  .question__label span {
    display: inline-block;
    width: 1em;
    height: 1em;
    background-color: #fff;
    border: 1px solid #707070;
    border-radius: 50%;
    position: relative;
    margin: -0.2em 0.25em 0 -1.5em;
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
