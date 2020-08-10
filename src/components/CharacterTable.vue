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
        <div v-on:click="openModal(data.item.name)">
          <b-img-lazy v-bind:src="getImagUrl(data.item.name)" fluid class="char-icons" />
        </div>
      </template>
    </b-table>
    <b-modal v-model="modalShow" id="my-Modal" name="my-modal" size="xl">
      <CharacterView v-bind:characterProp="modalCharacter" />
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CharacterTableItems from "../common/CharacterTableItem";
import Character from "../common/Character";
import CharacterView from "../views/Character.vue";

export default Vue.extend({
  name: "CharacterTable",
  components: {
    CharacterView,
  },
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
      characters: [] as Character[],
      items: [] as CharacterTableItems[],
      modalShow: false,
      modalCharacter: {} as Character,
    };
  },
  methods: {
    charactersFilter(
      character: CharacterTableItems,
      filterProp: { elements: string[]; roles: string[] }
    ) {
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
      let requireImage;
      try {
        requireImage = require("../assets/icons/" + picName + ".png");
      } catch {
        requireImage = "https://http.cat/404"
      }
      return requireImage;
    },
    openModal(characterName: string) {
      const character = this.characters.find(
        (character) => character.name == characterName
      );
      console.log(JSON.stringify(character));
      console.log(this.modalShow)
      if (character) {
        this.modalCharacter = character;
        this.modalShow = !this.modalShow
      }
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

<style>
.char-icons {
  max-width: 80px;
}
</style>