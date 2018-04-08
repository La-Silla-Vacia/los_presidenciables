<template>
  <div v-if="buttons" :class="$style.root">
    <button
      v-for="candidate in candidates"
      :key="candidate.id"
      @click="handleClick(candidate)"
      :data-active-index="isActive(candidate) + 1"
      :class="[
        $style.thumb,
        {[$style.active]: isActive(candidate) !== undefined}
      ]"
    >
      <User
        :name="candidate.name"
        :partido="candidate.partido"
        :photo="candidate.foto"
        size="compact"
      />
    </button>
  </div>
  <div v-else :class="$style.root">
    <router-link
      v-for="candidate in candidates"
      :key="candidate.id"
      :to="`${routeBase}${candidate.id}`"
      :class="[
        $style.thumb,
        {[$style.active]: $route.params.uid === candidate.id}
      ]"
    >
      <User
        :name="candidate.name"
        :partido="candidate.partido"
        :photo="candidate.foto"
        size="compact"
      />
    </router-link>
  </div>
</template>

<script>
  import User from '../molecules/User'

  export default {
    name: 'ThumbBar',
    components: {
      User
    },
    props: {
      routeBase: {
        default: './'
      },
      buttons: {
        default: false
      },
      filter: {
        type: Array
      }
    },
    methods: {
      handleClick (candidate) {
        this.$emit('change', candidate.name)
      },
      isActive (candidate) {
        if (typeof this.filter[0] === 'object') {
          for (let i = 0; i < this.filter.length; i += 1) {
            if (this.filter[i].name === candidate.name) return i
          }
        } else {
          return this.filter.indexOf(candidate.name) > -1
        }
      }
    },
    computed: {
      candidates () {
        return this.$store.getters.getCandidates()
      }
    }
  }
</script>

<style module lang="scss">
  @import "../../assets/styles/base";

  .root {
    overflow: auto;
  }

  .thumb {
    border: 1px solid #fff;
    display: block;
    padding: 20px 10px 20px 20px;
    background-color: #e3e4e5;
    opacity: 0.5;
    text-align: left;
    width: 100%;

    &:focus {
      outline: none;
      border-left: 3px solid $color__primary--base;
      padding-left: 18px;
      text-decoration: none;
    }
  }

  .active {
    border-left: 3px solid $color__primary--base;
    padding-left: 18px;
    background-color: #fff;
    opacity: 1;

    &[data-active-index="1"] figure {
      border: 2px solid rgb(33, 150, 243);
    }

    &[data-active-index="2"] figure {
      border: 2px solid #f44336;
    }

    &[data-active-index="3"] figure {
      border: 2px solid #ffca28;
    }

    &[data-active-index="4"] figure {
      border: 2px solid #43a047;
    }

    &[data-active-index="5"] figure {
      border: 2px solid #9c27b0;
    }
  }
</style>
