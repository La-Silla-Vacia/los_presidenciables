<template>
  <div :class="$style.root">
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
  @import '../../assets/styles/base';

  .root {
    overflow: auto;
  }

  .thumb {
    border: 1px solid #fff;
    display: block;
    padding: 20px 10px 20px 20px;
    background-color: #E3E4E5;
    opacity: .5;
  }

  .active {
    border-left: 3px solid $color__primary--base;
    padding-left: 18px;
    background-color: #fff;
    opacity: 1;
  }
</style>
