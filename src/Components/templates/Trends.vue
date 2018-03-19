<template>
  <div>
    <Bar title="¿Cómo gastan el presupuesto los candidatos?"/>
    <Container type="sidebar">
      <ThumbBar 
        @change="handleFilterChange" 
        :buttons="true"
        :filter="filter"
      />

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
    this.createWidget();
  },
  methods: {
    createWidget() {
      if (this.filter.length) {
        this.$refs.container.innerHTML = "";
      } else {
        this.$refs.container.innerHTML =
          "<em>Seleccione al menos 1 candidato</em>";
        return;
      }

      const items = this.comparisonItems;
      trends.embed.renderExploreWidgetTo(this.$refs.container, "TIMESERIES", {
        comparisonItem: items,
        category: 0,
        property: ""
      });
    },
    handleFilterChange(e) {
      const arrayIndex = this.filter.indexOf(e);
      if (arrayIndex !== -1) {
        this.filter.splice(arrayIndex, 1);
      } else if (this.filter.length === 5) {
        alert('You can\'t select more than 5 people at the time');
      } else {
        this.filter.push(e);
      }
      this.createWidget();
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
    },
    comparisonItems() {
      const candidates = this.filter;
      const result = [];
      candidates.map((candidate, i) => {
        if (i > 4) return;
        result.push({ keyword: candidate, geo: "", time: "today 12-m" });
      });
      return result;
    }
  },
  data() {
    return {
      embed: "<h2>Not working yet.</h2>",
      filter: [
        "Iván Duque",
        "Germán Vargas Lleras",
        "Sergio Fajardo",
        "Humberto de la Calle",
        "Gustavo Petro"
      ]
    };
  }
};
</script>

<style module lang="scss">
@import "../../assets/styles/base";

.content {
  max-width: 937px;
  width: 100%;
  margin: 1em auto;

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
