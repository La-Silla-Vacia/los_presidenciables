<template xmlns:backgroundImage="http://www.w3.org/1999/xhtml">
  <div :class="$style.root">
    <div
      :class="$style.avatar"
      :style="{ backgroundImage: `url(${photo})` }"
    ></div>
    <div>
      <div :class="$style.name">{{name}}</div>
      <div :class="$style.partido">{{partido}}</div>
    </div>
    <Button v-if="label" :compact="false">{{label}}</Button>
  </div>
</template>

<script>
  export default {
    name: 'User',
    props: {
      photo: {
        default: require('../../assets/images/photo_default.jpg')
      },
      name: {
        required: true
      },
      partido: {
        required: true
      },
      label: {}
    }
  }
</script>

<style module lang="scss">
  @import '../../assets/styles/base';

  .root {
    display: flex;
    font-family: map(fonts, family-sans-especial);
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
  }

</style>
