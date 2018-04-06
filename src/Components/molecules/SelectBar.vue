<template>
  <Bar
    :title="withQuestion ? question.question : items.active"
    :sub-title="withQuestion ? items.active : null"
    :title-is-button="true"
    @title-click="open = !open"
  >
    <slot/>
    <transition name="fade">
      <nav v-if="open" :class="$style.nav">
        <SelectBarItem
          v-for="theme in items.items"
          :key="theme"
          :text="theme"
          :isActive="theme === items.active"
          @click="open = false"
        />
      </nav>
    </transition>
  </Bar>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import Title from '../atoms/Title'
  import Bar from '../atoms/Bar'
  import SelectBarItem from '../atoms/SelectBarItem'

  export default {
    name: 'SelectBar',
    props: [
      'items',
      'with-question'
    ],
    mounted () {
      setTimeout(this.checkCurrent, 500)
    },
    methods: {
      checkCurrent () {
        for (let i = 0; i < this.items.items.length; i += 1) {
          const text = this.items.items[i]
          if (this.$route.hash === '#' + text.replace(/[^a-z0-9]/gi, '_').toLowerCase()) {
            this.$store.commit(types.RECEIVE_SITE, {theme: text})
          }
        }
      }
    },
    components: {
      Title,
      Bar,
      SelectBarItem
    },
    computed: {
      question () {
        return this.$store.getters.getQuestionByTheme()
      }
    },
    data () {
      return {
        open: false
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .nav {
    position: absolute;
    bottom: -1px;
    transform: translateY(100%);
    padding: 1em;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
    z-index: 1;
    background-color: #fff;
  }

  .nav::before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    width: 0.75em;
    height: 0.75em;
    transform: translateY(-50%) rotate(45deg);
    border: 1px solid rgba(149, 152, 154, 0.25);
    border-right: 0;
    border-bottom: 0;
    background-color: #fff;
  }
</style>
