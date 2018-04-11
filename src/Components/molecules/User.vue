<template>
  <div :class="[$style.root, {[$style[size]]: size}]">
    <figure
      :class="$style.avatar"
      :style="{ backgroundImage: `url(${photo})` }"
    ></figure>
    <div v-if="!isSmallScreen || size !== 'compact'">
      <div :class="$style.name">{{name}}</div>
      <div :class="$style.partido">{{partido}}</div>
    </div>
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'User',
    props: {
      photo: {
        type: String,
        default: require('../../assets/images/photo_default.jpg')
      },
      name: {
        required: true
      },
      partido: {
        required: true
      },
      label: {},
      size: {}
    },
    computed: {
      isSmallScreen () {
        return this.$store.getters.isTablet()
      }
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    display: flex;
    font-family: $font__family--sans--especial;
    color: #000;
    align-items: center;
  }

  .avatar {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background-color: #ccc;
    flex-grow: 0;
    flex-shrink: 0;
    margin-right: 12px;
    background-size: cover;
    background-position: center;
  }

  .name {
    font-size: 17px;
    font-weight: bold;
  }

  .partido {
    font-size: 9px;
    font-weight: 400;
    letter-spacing: 0.025em;
    align-items: center;
    text-transform: uppercase;
  }

  .compact {
    .name {
      font-size: 14px;
    }

    .partido {
      font-size: 8px;
    }

    @media only screen and (max-width: 992px) {
      .avatar {
        width: 40px;
        height: 40px;
      }
    }
  }

  .small {
    .avatar {
      width: 25px;
      height: 25px;
    }

    .name {
      font-size: 12px;
    }
  }
</style>
