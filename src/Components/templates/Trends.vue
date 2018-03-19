<template>
  <div>
    <Bar title="¿Cómo gastan el presupuesto los candidatos?"/>
    <Container :type="comparing ? 'comparing' : 'sidebar'">
      <ThumbBar routeBase="/como-los-buscan/"/>

      <div :class="$style.content">
        <div ref="container">
        </div>
      </div>

    </Container>
  </div>
</template>

<script>
import * as types from "../../store/mutation-types";

import Container from "../atoms/Container";
import Bar from "../atoms/Bar";
import Button from "../atoms/Button";
import ThumbBar from "../molecules/ThumbBar";
import ThumbSelect from "../molecules/ThumbSelect";
import Paper from "../molecules/Paper";

export default {
  name: "Trends",
  components: {
    Container,
    Bar,
    Button,
    ThumbBar,
    ThumbSelect,
    Paper
  },
  mounted() {
    console.log(this.$refs.container);
    const keyword = "/m/03c3tmt";
      trends.embed.renderExploreWidgetTo(
        this.$refs.container,
        "TIMESERIES",
        {
          comparisonItem: [{ keyword: keyword, geo: "", time: "today 12-m" }],
          category: 0,
          property: ""
        },
        {
          exploreQuery: "q=%2Fm%2F0rfgxy2",
          guestPath: "https://www.google.com:443/trends/embed/"
        }
      );
  },
  methods: {
    handleCompareClick(state) {
      this.$store.commit(types.RECEIVE_COMPARE, {
        active: state,
        first: this.candidate
      });
    }
  },
  computed: {
    candidate() {
      const candidate = this.$route.params.uid;
      return this.$store.getters.getCandidateByUid(candidate);
    },
    comparing() {
      return this.$store.getters.isComparing();
    },
    isSingle() {
      return this.$route.params.uid;
    },
    data() {
      return this.$store.getters.getMaquinaria(this.candidate.name);
    }
  },
  data() {
    return {
      embed: "<h2>Not working yet.</h2>"
    };
  }
};
</script>

<style module lang="scss">
@import "../../assets/styles/base";

.content {
  p {
    font-family: $font__family--serif--especial;
    margin: 0 0 0.5em 0;
    font-size: 18px;
  }

  .highlight {
    color: $color__primary--base;
    font-family: $font__family--sans--especial;
    font-size: 12px;
    letter-spacing: 0.035em;
    font-weight: bold;
    margin-top: 2em;
  }
}
</style>
