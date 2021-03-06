<template>
  <div ref="el" :class="[$style.container, {[$style.loading]: loading}]">
    <LoadScreen v-if="loading"/>
    <Header v-else-if="!single"/>
    <router-view v-if="!loading" :name="single" :key="$route.path"/>
    <div :class="$style.credits">
      <div>
        <span>Diseño</span>
        <img src="http://bestiario.org/themes/default/bestiario_logo.svg" alt="Bestiario"/>
      </div>
    </div>
  </div>
</template>

<script>
  import debounce from 'lodash.debounce'
  import EventBus from './util/EventBus'
  import * as types from './store/mutation-types'

  import LoadScreen from './Components/atoms/LoadScreen'
  import Header from './Components/molecules/Header'

  export default {
    name: 'app',
    components: {
      LoadScreen,
      Header
    },
    props: [
      'single'
    ],
    data () {
      return {}
    },
    beforeCreate () {
      this.$store.commit(types.RECEIVE_SETTINGS, {settings: window.los_presidenciables__data})
      this.$store.dispatch('fetchContent')
    },
    created () {
      window.addEventListener('resize', this.onResizeDebounced, true)
      window.addEventListener('orientationchange', this.onOrientationChange, false)
      window.addEventListener('scroll', this.onScrollDebounced)

      this.onResize()
    },
    destroyed () {
      window.removeEventListener('resize', this.onResizeDebounced, true)
      window.removeEventListener('orientationchange', this.onOrientationChange, false)
      window.removeEventListener('scroll', this.onScrollDebounced)
    },
    computed: {
      loading () {
        return !this.$store.getters.isLoaded()
      }
    },
    mounted () {
      this.$router.push({name: this.single})
    },
    methods: {
      onResize (event) {
        let windowWidth = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth
        this.$store.commit(types.UPDATE_APP, {field: 'tablet', value: windowWidth <= 992})
        this.$store.commit(types.UPDATE_APP, {field: 'phone', value: windowWidth <= 480})

        EventBus.$emit('app.resize', event)
      },
      onResizeDebounced: debounce(function (event) {
        this.onResize(event)
      }, 16),
      onScroll (event) {
        EventBus.$emit('app.scroll', event)
      },
      onScrollDebounced: debounce(function (event) {
        this.onScroll(event)
      }, 16),
      onOrientationChange (event) {
        EventBus.$emit('app.orientationchange', event)
      }
    }
  }
</script>

<style lang="scss">
  @import './assets/styles/base';
  @import './assets/styles/transitions';

  /* Hide the sidebar in historias */
  .article-sidebar.col-md-4.col-lg-3 {
    display: none;
  }

  .field-item > p,
  .img-container {
    max-width: 713px;
  }

  .news {
    padding-left: 0;
  }

  .article-main-body {
    padding-left: 0;
  }

  @media (min-width: 1200px) {
    .article-content.col-sm-12.col-md-8 {
      width: 100%;
      margin-left: 0;
      padding-left: 0;
    }
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    .article-content.col-md-8 {
      width: calc(100% - 20px) !important;
    }
  }

  .lsv-interactive {
    width: 100%;
    font-family: "Roboto", Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 400;

    & svg {
      overflow: visible;
    }
  }

  #app {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>

<style module lang="scss">
  @import './assets/styles/base';

  .container {
    font-family: $font__family--sans;
    font-size: 16px;
    transition: .2s;
    display: block;
  }

  .title {
    margin: 1em;
  }

  .loading {
    background-color: #fff;
  }

  .credits {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    text-align: center;
    justify-self: flex-end;
    margin-left: auto;
    margin-bottom: 3em;
  }

  .credits img {
    width: 40%;
    display: block;
  }

  .credits div {
    margin-left: auto;
    font-family: 'Roboto Condensed', 'Roboto', sans-serif;
    margin-right: 40px;
  }

  .credits > div:first-child {
    padding-top: 0.5em;
    text-align: left;

    img {
      width: 93px;
    }
  }

  .credits span {
    font-size: 12px;
  }

  .credits p {
    font-size: 10px !important;
    margin: 0.5em 0 0 1em;
    line-height: 1;
    text-align: left;
  }
</style>
