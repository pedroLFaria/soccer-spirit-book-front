<template>
  <div>
    <b-table
      striped
      hover
      :items="items"
      :fields="fields"
      :filter="criteria"
      :filter-function="charactersFilter"
    >
      <template v-slot:cell(icon)="data">
        <img alt="Vue logo" v-bind:src="getImagUrl(data.item.name)" />
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CharacterTableItems from "../common/CharacterTableItem";
import Character from "../common/Character";
const characters: Character[] = [];
const CharacterTableItem: CharacterTableItems[] = [];
export default Vue.extend({
  data() {
    return {
      criteria: this.filters,
      fields: [
        {
          key: "icon",
          label: "Icon",
        },
        {
          key: "name",
          sortable: true,
        },
        {
          key: "role",
        },
        {
          key: "element",
        },
        {
          key: "aceSkill",
        },
      ],
      characters: characters,
      items: CharacterTableItem,
    };
  },
  methods: {
    charactersFilter(
      character: CharacterTableItems,
      filterProp: { elements: string[]; roles: string[] }
    ) {
      console.log(JSON.stringify(filterProp));
      console.log(
        JSON.stringify({ role: character.role, element: character.element })
      );
      if (filterProp.elements.length == 0 && filterProp.roles.length == 0)
        return true;
      else if (filterProp.roles.length == 0)
        return filterProp.elements.find(
          (element) => character.element == element
        );
      else if (filterProp.elements.length == 0)
        return filterProp.roles.find((role) => character.role == role);
      else
        return (
          filterProp.roles.find((role) => character.role == role) &&
          filterProp.elements.find((element) => character.element == element)
        );
    },
    getImagUrl(picName: string) {
      return require("../assets/icons/" + picName + ".png");
    },
  },
  beforeMount() {
    fetch("/characters.json")
      .then((response) => response.json())
      .then((data) => data as Character[])
      .then((characters) => {
        this.characters = characters;
        this.items = characters.map((character) => {
          return {
            name: character.name,
            role: character.role,
            element: character.element,
            aceSkill: character.ace.skill,
          };
        });
      });
  },
  props: ["filters"],
});
</script>