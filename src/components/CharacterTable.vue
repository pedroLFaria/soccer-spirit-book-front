<template>
  <div>
    <b-table
      striped
      hover
      :items="characters"
      :fields="fields"
      :filter="criteria"
      :filter-function="charactersFilter"
    ></b-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Character from "../common/Characters";
fetch("../assets/characters.json").then(response => response.json()).then(console.log)

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
        {
          key: "aceSkill",
          sortable: false,
        },
      ],
      characters: [
        {
          name: "Sam",
          element: "Ardor",
          aceSkill:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at laoreet dui. Nam eu ullamcorper lacus, ac pulvinar sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin aliquet ante nunc, eget blandit eros mattis ut.",
        },
        {
          name: "Dalgi",
          element: "Whirlwind",
          aceSkill:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at laoreet dui. Nam eu ullamcorper lacus, ac pulvinar sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin aliquet ante nunc, eget blandit eros mattis ut.",
        },
        {
          name: "Uranus",
          element: "Thunder",
          aceSkill:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at laoreet dui. Nam eu ullamcorper lacus, ac pulvinar sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin aliquet ante nunc, eget blandit eros mattis ut.",
        },
        {
          name: "Vonchi",
          element: "Light",
          aceSkill:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at laoreet dui. Nam eu ullamcorper lacus, ac pulvinar sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin aliquet ante nunc, eget blandit eros mattis ut.",
        },
        {
          name: "Presty",
          element: "Dark",
          aceSkill:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at laoreet dui. Nam eu ullamcorper lacus, ac pulvinar sem. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin aliquet ante nunc, eget blandit eros mattis ut.",
        },
      ],
    };
  },
  methods: {
    charactersFilter(
      character: Character,
      filterProp: { elements: string[]; roles: string[] }
    ) {
      if (filterProp.elements.length == 0 && filterProp.roles.length == 0)
        return true;
      return filterProp.elements.find(
        (element) => character.element == element
      );
    },
  },
  props: ["filters"],
});
</script>