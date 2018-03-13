<template>
  <div :class="$style.root">
    <router-link
      v-for="candidate in candidates"
      :key="candidate.id"
      :to="`./${candidate.id}`"
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
    max-height: $max-content-height;
    overflow: auto;
  }

  .thumb {
    border: 1px solid #fff;
    display: block;
    padding: 20px 10px 20px 20px;
  }

  .active {
    border-left: 3px solid $color__primary--base;
    padding-left: 18px;
    background-color: #fff;
  }
</style>
