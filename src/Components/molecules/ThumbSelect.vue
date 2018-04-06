<template>
  <div :class="[$style.root, {[$style.open]: !current || open}]">
    <button :class="$style.button" @click="open = !open">
      <User
        v-if="current"
        :name="current.name"
        :partido="current.partido"
        :photo="current.foto"
        size="compact"
      />
      <span v-else :class="$style.select">Seleccione un candidato</span>
    </button>

    <transition name="fade">
      <nav :class="$style.slide" v-if="!current || open">
        <button
          v-for="candidate in candidates"
          :class="[$style.button, $style.noPadding]"
          :key="candidate.id"
          @click="handleSelect(candidate)"
        >
          <User
            :name="candidate.name"
            :partido="candidate.partido"
            :photo="candidate.foto"
            size="small"
          />
        </button>
      </nav>
    </transition>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import User from '../molecules/User'

  export default {
    name: 'ThumbSelect',
    components: {
      User
    },
    props: {
      which: {
        required: true
      }
    },
    methods: {
      handleSelect (candidate) {
        this.open = false
        if (this.which === 'first') {
          this.$store.commit(types.RECEIVE_COMPARE, {active: true, first: candidate})
        } else {
          this.$store.commit(types.RECEIVE_COMPARE, {active: true, second: candidate})
        }
      }
    },
    computed: {
      candidates () {
        return this.$store.getters.getCandidates()
      },
      current () {
        return this.$store.getters.isComparing(this.which)
      }
    },
    data () {
      return {
        open: (this.current === null)
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    padding: 0 20px;
    border-bottom: 1px solid rgba(149, 152, 154, .25);
    position: relative;
    z-index: 1;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 0;
      background-color: #B2BABF;
      top: 100%;
      left: 0;
      opacity: 0;
      transition: .4s;
    }
  }

  .open::after {
    height: $max-content-height - 66;
    opacity: 1;
  }

  .button {
    border: 0;
    background: transparent;
    border-radius: 0;
    padding: 8px 30px 0 0;
    text-align: left;
    position: relative;
    min-height: 65px;
    z-index: 1;

    &::after {
      content: '';
      width: 14px;
      height: 7px;
      background-image: url(../../assets/images/caret_down.svg);
      position: absolute;
      right: 0;
      top: 50%;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }

  .noPadding {
    padding: 0;
    min-height: inherit;

    &::after {
      display: none;
    }
  }

  .select {
    font-size: 12px;
    font-family: $font__family--sans--especial;
    font-style: italic;
    color: #B2BABF;
  }

  .slide {
    position: absolute;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 13px;
    padding: 1em 20px;
    background: #f6f6f6;
    width: 100%;
    left: 0;
    z-index: 10;
    border-top: 1px solid rgba(149, 152, 154, .25);
  }
</style>
