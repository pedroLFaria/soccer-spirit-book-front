<template>
    <b-container>

  <div>
    <b-table
      striped
      hover
      :items="stones"
      :fields="fields"
      :filterStone="criteria"
      :filter-function="stonesFilter"
    ></b-table>
  </div>
    </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import Stone from "../common/Stone";
fetch("../assets/stones.json").then(response => response.json()).then(console.log)

export default Vue.extend({
  data() {
    return {
      criteria: this.filters,
      fields: [
        {
          key: "name",
          sortable: true,
        },
        {
          key: "element",
          sortable: false,
        },
        
      ],
      stones: [
        {
          name: "Pedra",
          element: "Ardor",
          ability:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at laoreet dui. Nam eu ullamcorper lacus, ac pulvinar sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin aliquet ante nunc, eget blandit eros mattis ut.",
        },
        {
          name: "Pedro",
          element: "Whirlwind",
          ability:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at laoreet dui. Nam eu ullamcorper lacus, ac pulvinar sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin aliquet ante nunc, eget blandit eros mattis ut.",
        },
        {
          name: "Doca",
          element: "Thunder",
          ability:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at laoreet dui. Nam eu ullamcorper lacus, ac pulvinar sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin aliquet ante nunc, eget blandit eros mattis ut.",
        },
        {
          name: "Rock",
          element: "Light",
          ability:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at laoreet dui. Nam eu ullamcorper lacus, ac pulvinar sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin aliquet ante nunc, eget blandit eros mattis ut.",
        },
        {
          name: "Stone",
          element: "Dark",
          ability:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at laoreet dui. Nam eu ullamcorper lacus, ac pulvinar sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin aliquet ante nunc, eget blandit eros mattis ut.",
        },
      ],
    };
  },
  methods: {
    stonesFilter(
      stone: Stone,
      filterProp: { elements: string[]}
    ) {
      if (filterProp.elements.length == 0)
        return true;
      return filterProp.elements.find(
        (element) => stone.element == element
      );
    },
  },
  props: ["filters"]
});
</script>